const express = require("express");
const {
    validationHandler,
    fileDeleteValidators,
    fileDownloderValidators
} = require("../validators/FileDeleteValidators");
// internal imports
const {
    addFile,
    deleteFile,
    downloadFile
} = require("../controllers/FileProcessController");

const router = express.Router();

router.post("/files", validationHandler, addFile);

router.delete("/files/:privatekey", fileDeleteValidators, validationHandler, deleteFile);

router.get("/files/:publickey", fileDownloderValidators, validationHandler, downloadFile);

module.exports = router;

