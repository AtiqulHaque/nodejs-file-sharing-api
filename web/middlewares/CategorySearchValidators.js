const {body, validationResult} = require("express-validator");
const Response = require("../../utilities/response");
let categorySearchValidators = [
    body("query", "Company name is required")
        .isLength({min: 2}).withMessage("Minimum character limit is 2")
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
    categorySearchValidators: categorySearchValidators
};
