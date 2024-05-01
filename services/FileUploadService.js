const {upload, modifyUploader} = require("./ImageUpload");

const imageUpload = upload.fields([
    {name: 'svg_image', maxCount: 1},
    {name: 'svg_image_rec', maxCount: 1},
    {name: 'svg_image_square', maxCount: 1},
    {name: 'png_image', maxCount: 1},
    {name: 'png_image_rec', maxCount: 1},
    {name: 'png_image_square', maxCount: 1},
]);




class FileUploadService {
    uploadFile(req){
        return  new Promise((resolve, reject) => {
            upload.single('svg_image')(req, {}, function (err) {
                if (err) {
                    reject(err);
                }
              
              //  console.log(req.file, req.files);
                // req.file, req.files...

                resolve(req.file);
              })


          });

          
        
    }
}

module.exports = FileUploadService;