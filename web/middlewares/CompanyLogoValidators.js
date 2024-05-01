const {body, validationResult} = require("express-validator");

const Response = require("../../utilities/response");
const {s3delete} = require("../../services/ImageUpload");
const CompanyModel = require('../../database/models/CompanyModel');
const CategoryModel = require('../../database/models/CategoryModel');
const filterText = require("../../utilities/filterText");
const CompanyNameFilter = require("../../utilities/CompanyNameFilter");
let companyLogoValidators = [
    body("query", "Company name is required")
        .isLength({min: 2}).withMessage("Minimum character limit is 2")
        .trim()
        .not()
        .isEmpty()
];

let companyAddValidators = [
    body("display_name", "Company  name is required")
        .isLength({min: 2})
        .trim()
        .not()
        .isEmpty(),
    body("type", "Company type is required")
        .isLength({min: 2})
        .trim()
        .not()
        .isEmpty(),
    body('display_name').custom((value, { req }) => {
        let company_name = CompanyNameFilter.parseName(value);
        if(typeof req.body.type != "undefined" && req.body.type === "category"){
            return CategoryModel.find({company_name: company_name, type :req.body.type }).then(company => {
                if (typeof company != "undefined" && company.length > 0) {
                    return Promise.reject('Company already exists');
                }
            });
        }

        return CompanyModel.find({company_name: company_name}).then(company => {
            if (typeof company != "undefined" && company.length > 0) {
                return Promise.reject('Company already exists');
            }
        });

    }),
];


let companyUpdateValidators = [
    body("display_name", "Company  name is required")
        .isLength({min: 2})
        .trim()
        .not()
        .isEmpty(),
    body("type", "Company type is required")
        .isLength({min: 2})
        .trim()
        .not()
        .isEmpty(),
    body('display_name').custom((value, { req }) => {

        let company_name = CompanyNameFilter.parseName(value);

        if(typeof req.body.type != "undefined" && req.body.type === "category"){
            return CategoryModel.find({company_name: company_name,type :req.body.type,
                _id : {$ne : req.body.company_id}}).then(company => {
                if (typeof company != "undefined" && company.length > 0) {
                    return Promise.reject('Category already exists');
                }
            });
        }

        return CompanyModel.find({company_name: company_name,type :req.body.type, _id : {$ne : req.body.company_id}})
            .then(company => {
              //  console.log(req.body.company_id, company, req.body.type, company_name);
            if (typeof company != "undefined" && company.length > 0) {
                return Promise.reject('Company already exists');
            }
        });

    }),
];

const validationHandler = function (req, res, next) {
    const errors = validationResult(req);
    console.log(errors);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        if (typeof req.files != 'undefined') {
            Object.keys(req.files).map(key => {
                s3delete({
                    'Bucket': process.env.S3_BUCKET_NAME + "/images/employer_images",
                    'Key': req.files[key][0].key
                }).then((data) => {
                    console.log(data);
                }).catch((error) => {
                    console.log(error);
                })
            });
        }

        res.status(400)
            .json(Response.validationError(mappedErrors, Response.startTime));
    }
};
module.exports = {
    validationHandler,
    companyAddValidators: companyAddValidators,
    CompanyLogoValidators: companyLogoValidators,
    companyUpdateValidators: companyUpdateValidators
};
