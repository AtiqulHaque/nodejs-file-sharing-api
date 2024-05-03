const FileModel = require('../models/FileModel');
const logger = require("../../utilities/logger");
const app_settings = require("../../settings/app");

class FileRepository {
    constructor() {
        this.File = FileModel;
    }
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


    async getFileByPrivateKey(private_key) {

        try {
            const file = await this.File.find({"private_key": private_key});

            if(file.length > 0){
                return {
                    'status': "success",
                    'data': file[0]
                }
            }

            return {
                'status': "error",
                'data': "file not found"
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


    async getFileByPubKey(public_key) {

        try {
            const file = await this.File.find({"public_key": public_key});
            
            if(file.length > 0){
                return {
                    'status': "success",
                    'data': file[0]
                }
            }

            return {
                'status': "error",
                'data': "file not found"
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


    async removePrivatKeyById(private_key) {

        try {

            let response = await this.File.find({private_key: private_key}).remove();

            return {
                'status': "success",
                'data': response
            }

        } catch (e) {

            console.log(e);

            logger.log('error', e);

            return {
                'status': "error",
                'data': e
            }
        }


    }


    async updateLastExcessTimeByPublicKey(public_key) {

        try {

            //new Date().toISOString()
            let response = await this.File.updateOne(
                { public_key: public_key },
                 { last_excess: new Date().toISOString() }
                 );

            return {
                'status': "success",
                'data': response
            }

        } catch (e) {

            console.log(e);

            logger.log('error', e);

            return {
                'status': "error",
                'data': e
            }
        }


    }


    async getAllInActiveFiles() {

        try {

            let cutoff = new Date();
            cutoff.setDate(cutoff.getDate() - parseInt(app_settings.inactive_duration));

            const files = await this.File.find({last_excess: {$lt: cutoff}});
            
            if(files.length > 0){
                return {
                    'status': "success",
                    'data': files
                }
            }

            return {
                'status': "error",
                'data': []
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
}

module.exports = FileRepository;