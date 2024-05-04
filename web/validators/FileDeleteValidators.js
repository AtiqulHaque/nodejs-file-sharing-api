const { body, param, validationResult } = require('express-validator');

const Response = require('../../utilities/response');
let fileDeleteValidators = [
    param('privatekey', 'Private key is required')
        .isLength({ min: 32 })
        .withMessage('Minimum character limit is 32')
        .isLength({ max: 33 })
        .withMessage('Maximum character limit is 32')
        .trim()
        .not()
        .isEmpty(),
];

let fileDownloderValidators = [
    param('publickey', 'Public key is required')
        .isLength({ min: 32 })
        .withMessage('Minimum character limit is 32')
        .isLength({ max: 33 })
        .withMessage('Maximum character limit is 32')
        .trim()
        .not()
        .isEmpty(),
];

const validationHandler = function (req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.status(400).json(Response.validationError(mappedErrors, Response.startTime));
    }
};
module.exports = {
    validationHandler,
    fileDownloderValidators,
    fileDeleteValidators,
};
