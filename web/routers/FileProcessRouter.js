const express = require('express');
const rateLimit = require('./../../middlewares/rateLimiter');
const {
    validationHandler,
    fileDeleteValidators,
    fileDownloderValidators,
} = require('../validators/FileDeleteValidators');
// internal imports
const { addFile, deleteFile, downloadFile } = require('../controllers/FileProcessController');

const router = express.Router();

/**
 *   @swagger
 *   tags:
 *     name: File Sharing API
 *     description: API to manage File Share.
 */

router.post('/files', rateLimit.UploadLimitMiddleware, validationHandler, addFile);
/**
 * @swagger
 * /files:
 *   post:
 *     summary: Upload file
 *     consumes:
 *      - multipart/form-data
 *     parameters:
 *      - in: formData
 *        name: file
 *        type: file
 *        required: true
 *        description: The file to upload.
 *     description: This api can upload any file.
 *     tags: [File Sharing]
 *     responses:
 *       200:
 *         description: File upload.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  status:
 *                      type: string
 *                      description: Response status.
 *                      example: success||error
 *                  payload:
 *                     type: object
 *                     properties:
 *                       private_key:
 *                         type: string
 *                         description: Image url.
 *                         example: eb40ce4e361987c70cd1f0f53418b319
 *                       public_key:
 *                         type: string
 *                         description: public key.
 *                         example: eb40ce4e361987c70cd1f0f53418b319.
 *
 *       400:
 *         description: Validation Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  status:
 *                      type: string
 *                      description: Response status.
 *                      example: validation-error
 *                  payload:
 *                      type: object
 *                      properties:
 *                       query:
 *                         type: object
 *                         properties:
 *                             msg:
 *                               type : string
 *                               description: Error message.
 *                               example: Minimum character limit is 2
 *                             param:
 *                               type : string
 *                               description: Error message.
 *                               example: query
 *                             location:
 *                               type : string
 *                               description: Error message.
 *                               example: body
 *       500:
 *         description: Download file Error.
 */

router.delete('/files/:privatekey', fileDeleteValidators, validationHandler, deleteFile);

/**
 * @swagger
 * /files/:private_key:
 *   delete:
 *     summary: Remove uploded file by its private_key.
 *     description: Get uploded file by its private_key.
 *     tags: [File Sharing]
 *     parameters:
 *       - name: "private_key"
 *         in: "query"
 *         description: "private key for download file"
 *         required: true
 *         type: "string"
 *         format: "string"
 *         example: eb40ce4e361987c70cd1f0f53418b319
 *     responses:
 *       200:
 *         description: Doenload file with acurate myme type.
 *
 *       400:
 *         description: Validation Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  status:
 *                      type: string
 *                      description: Response status.
 *                      example: validation-error
 *                  payload:
 *                      type: object
 *                      properties:
 *                       query:
 *                         type: object
 *                         properties:
 *                             msg:
 *                               type : string
 *                               description: Error message.
 *                               example: Minimum character limit is 2
 *                             param:
 *                               type : string
 *                               description: Error message.
 *                               example: private_key
 */

router.get(
    '/files/:publickey',
    rateLimit.DownloadLimitMiddleware,
    fileDownloderValidators,
    validationHandler,
    downloadFile
);
/**
 * @swagger
 * /files/:public_key:
 *   get:
 *     summary: Download file by its public_key.
 *     description: Download file by its public_key.
 *     tags: [File Sharing]
 *     parameters:
 *       - name: "public_key"
 *         in: "query"
 *         description: "public_key for download file"
 *         required: true
 *         type: "string"
 *         format: "string"
 *         example: eb40ce4e361987c70cd1f0f53418b319
 *     responses:
 *       200:
 *         description: Download file with acurate mime type.
 *       500:
 *         description: Download Error.
 *       400:
 *         description: Validation Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  status:
 *                      type: string
 *                      description: Response status.
 *                      example: validation-error
 *                  payload:
 *                      type: object
 *                      properties:
 *                       query:
 *                         type: object
 *                         properties:
 *                             msg:
 *                               type : string
 *                               description: Error message.
 *                               example: Minimum character limit is 2
 *                             param:
 *                               type : string
 *                               description: Error message.
 *                               example: public_key
 */
module.exports = router;
