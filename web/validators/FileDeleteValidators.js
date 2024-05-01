const {body,param, validationResult} = require("express-validator");

const Response = require("../../utilities/response");
let fileDeleteValidators = [
    param("privatekey", "Private key is required")
        .isLength({min: 35}).withMessage("Minimum character limit is 35")
        .isLength({max : 36}).withMessage("Maximum character limit is 35")
        .trim()
        .not()
        .isEmpty()
];


let fileGetValidators = [
    param("publickey", "Public key is required")
        .isLength({min: 35}).withMessage("Minimum character limit is 35")
        .isLength({max : 36}).withMessage("Maximum character limit is 35")
        .trim()
        .not()
        .isEmpty()
];


const validationHandler = function (req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.status(400)
            .json(Response.validationError(mappedErrors, Response.startTime));
    }
};
module.exports = {
    validationHandler,
    fileGetValidators,
    fileDeleteValidators
};
