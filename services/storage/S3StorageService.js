const app_settings = require("./../../settings/app");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();
const s3_settings = require("./../../settings/providers/s3");

const s3 = new aws.S3({
    accessKeyId:s3_settings.ACCESS_KEY,
    secretAccessKey: s3_settings.ACCESS_SECRET
});



const s3Uploader = multer({
    storage: multerS3({
        acl: "public-read",
        s3,
        bucket: s3_settings.BUCKET_NAME + "/files",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, `${Date.now().toString()}_${file.fieldname}${path.extname(file.originalname).toLowerCase()}`);
        }
    }),
});


const s3delete = function (params) {
    return new Promise((resolve, reject) => {
        s3.deleteObject(params, function (err, data) {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve(data)
                console.log(params.Key + " Successfully deleted");
            }
        });
    });
};


// const imageUpload = s3Uploader.fields([
//     {name: 'file', maxCount: 1},
// ]);

const directoryPath = __basedir + "/" + app_settings.upload_folder+ "/";



class S3StorageService {
    
    uploadFile (req) { 
       
        return  new Promise((resolve, reject) => {
            
            s3Uploader.single('file')(req, {}, function (err) {
                if (err) {
                    reject(
                        {
                            "status" : "error",
                            "data" : err.message
                        }
                    );
                }

                resolve(
                     {
                        "status" : "success",
                        "data" : {
                            "filename" : req.file.key,
                            "mimetype" : req.file.contentType
                        } 
                    }
                );
              })

          });
    }
    getFile(file) {
        var options = {
            Bucket    : s3_settings.BUCKET_NAME + "/files",
            Key       : file.file_name,
        };

        return s3.getObject(options).createReadStream();
     }

    async deleteFile(filePath){

        try {
            
            return new Promise((resolve, reject) => {
                s3.deleteObject({
                'Bucket': s3_settings.BUCKET_NAME + "/files",
                'Key': filePath
                }, function (err, data) {
                    if (err) {
                        console.log(err);
                        reject(
                            {
                                "status" : "error",
                                "data" : err.message
                            }
                        )
                    } else {
                        console.log(data)
                        resolve({
                            "status" : "success",
                            "data" : "File " + filePath + "Successfully delete"
                        })
                        //console.log(params.Key + " Successfully deleted");
                    }
                });
            });

        

          } catch (err) {
            console.error(err);
            return {
                "status" : "error",
                "data" : "Something went wrong" 
            }
          }
    }

}


module.exports = S3StorageService;