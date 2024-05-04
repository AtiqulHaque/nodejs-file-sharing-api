const express = require("express");
const rateLimit = require("./../../middlewares/rateLimiter");
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

router.post("/files", rateLimit.UploadLimitMiddleware, validationHandler, addFile);

router.delete("/files/:privatekey", fileDeleteValidators, validationHandler, deleteFile);

router.get("/files/:publickey", rateLimit.DownloadLimitMiddleware,  fileDownloderValidators, validationHandler, downloadFile);

module.exports = router;

