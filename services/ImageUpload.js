const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app_settings = require('./../settings/app');
const dir = path.resolve(path.join(__dirname, '../' + app_settings.upload_folder));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, app_settings.upload_folder + '/');
    },
    filename: function (req, file, cb) {
        cb(
            null,
            `${Date.now().toString()}_${file.fieldname}${path
                .extname(file.originalname)
                .toLowerCase()}`
        );
    },
});

const upload = multer({
    storage: storage,
});

module.exports = {
    upload,
};
