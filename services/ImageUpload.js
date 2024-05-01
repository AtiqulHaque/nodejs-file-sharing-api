const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require('path');
const dir = path.resolve(path.join(__dirname, '../uploads'));
const logger = require("../utilities/logger");
const fs = require('fs');

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_ACCESS_SECRET,
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png"
     || file.mimetype === "image/svg+xml") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only JPEG and PNG and Svg is allowed!"), false);
    }
};



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    } 
    cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now().toString()}_${file.fieldname}${path.extname(file.originalname).toLowerCase()}`);
    }
});


// const upload = multer({
//     fileFilter,
//     storage: multerS3({
//         acl: "public-read",
//         s3,
//         bucket: process.env.S3_BUCKET_NAME + "/images/employer_images",
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         key: function (req, file, cb) {
//             cb(null, `${Date.now().toString()}_${file.fieldname}${path.extname(file.originalname).toLowerCase()}`);
//         }
//     }),
// });


const upload = multer({
    storage: storage,
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


const removeUploadedFiles = function (req) {
    if (typeof req.files != 'undefined') {

    }
}

class ImageUploadService {

    removeUploadedFiles(req) {
        Object.keys(req.files).map(key => {
            s3delete({
                'Bucket': process.env.S3_BUCKET_NAME + "/images/employer_images",
                'Key': req.files[key][0].key
            }).then((data) => {
                console.log(data);
            }).catch((error) => {
                console.log(error);
                logger.log('error', error);
            })
        });
    }
}

module.exports = {
    upload,
    s3delete,
    ImageUploadService
};