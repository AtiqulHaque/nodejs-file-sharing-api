const FileModel = require('../models/FileModel');
const logger = require("../../utilities/logger");

class FileRepository {
    constructor() {
        this.File = FileModel;
    }

    // async getAllCompanies() {
    //     return this.Company.find({}).exec()
    // }

    async addFile(param) {
        try {
            let response = await this.File.create(param);
            return {
                'status': "success",
                'data': response
            }
        } catch (e) {
            console.log(e);
            logger.log('error', e);

            let errorMessages = e;

            if (typeof e.errors !== 'undefined') {
                errorMessages = e.errors;
            }

            return {
                'status': "error",
                'data': errorMessages
            }
        }

    }


    // async getCompanyById(company_id) {

    //     try {
    //         const doc = await this.Company.findById(company_id);

    //         return {
    //             'status': "success",
    //             'data': doc
    //         }
    //     } catch (e) {

    //         console.log(e);

    //         logger.log('error', e);

    //         let errorMessages = e;

    //         if (typeof e.errors !== 'undefined') {
    //             errorMessages = e.errors;
    //         }

    //         return {
    //             'status': "error",
    //             'data': errorMessages
    //         }
    //     }
    // }


    // async updateCompany(company_id, params) {

    //     try {
    //         let docu = await this.Company.findByIdAndUpdate(company_id, params, {
    //             new: true,
    //             runValidators: false
    //         });

    //         return {
    //             'status': "success",
    //             'data': docu
    //         }

    //     } catch (e) {

    //         console.log(e);

    //         logger.log('error', e);

    //         return {
    //             'status': "error",
    //             'data': e
    //         }
    //     }
    // }


    // async removeCompanyById(company_id) {

    //     try {

    //         let response = await CompanyModel.find({_id: company_id}).remove();

    //         return {
    //             'status': "success",
    //             'data': response
    //         }

    //     } catch (e) {

    //         console.log(e);

    //         logger.log('error', e);

    //         return {
    //             'status': "error",
    //             'data': e
    //         }
    //     }


    // }
}

module.exports = FileRepository;