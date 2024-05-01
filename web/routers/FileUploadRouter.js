const express = require("express");
const {
    CompanyLogoValidators,
    companyAddValidators,
    validationHandler,
    companyUpdateValidators
} = require("../middlewares/CompanyLogoValidators");
// internal imports
const {
    addFile
} = require("../controllers/FileUploadController");

const {upload, modifyUploader} = require("../../services/ImageUpload");
const router = express.Router();


const imageUpload = upload.fields([
    {name: 'svg_image', maxCount: 1},
    {name: 'svg_image_rec', maxCount: 1},
    {name: 'svg_image_square', maxCount: 1},
    {name: 'png_image', maxCount: 1},
    {name: 'png_image_rec', maxCount: 1},
    {name: 'png_image_square', maxCount: 1},
]);

router.post("/files", validationHandler, addFile);

module.exports = router;

