const LocalStorageService = require('./LocalStorageService');
const app_settings = require('./../../settings/app');
const S3StorageService = require('./S3StorageService');

// Interface definition for storage services
const StorageInterface = {
    uploadFile: function () {}, // Method for uploading files
    getFile: function (param1, param2) {}, // Method for retrieving files
    deleteFile: function () {}, // Method for deleting files
};

/**
 * @description Checks if an object implements a given interface
 * @param {*} obj - The object to be checked
 * @param {*} interfaceObj - The interface object containing method definitions
 * @returns {boolean} - True if the object implements the interface, otherwise false
 */
function implementsInterface(obj, interfaceObj) {
    for (const method in interfaceObj) {
        if (!(method in obj) || typeof obj[method] !== 'function') {
            return false;
        }
    }
    return true;
}

// Create instances of storage service classes
const LocalStorage = new LocalStorageService();
const s3Storage = new S3StorageService();

/**
 * @description Factory class for creating storage service objects
 * @class StorageFactory
 * @date 04/05/2024
 */
class StorageFactory {
    /**
     * @description Returns the appropriate storage service object based on the configuration
     * @static
     * @returns {*} - Storage service object
     * @memberof StorageFactory
     */
    static getStorageObject() {
        console.log(app_settings.storage);
        // Check the configured storage type in application settings
        if (app_settings.storage === 'S3') {
            // If S3 storage is configured, check if the S3 storage service implements the storage interface
            if (implementsInterface(s3Storage, StorageInterface)) {
                return s3Storage; // Return the S3 storage service object
            }
        } else if (app_settings.storage === 'google') {
            // For Google storage, implement Google storage service object (not implemented in the provided code)
            throw 'Please set up your storage service. Invalid Storage';
        } else if (
            app_settings.storage === 'local' ||
            typeof app_settings.storage === 'undefined'
        ) {
            // If local storage is configured or no storage type is specified, return the local storage service object
            if (implementsInterface(LocalStorage, StorageInterface)) {
                return LocalStorage;
            }
        }

        // If no valid storage service is found, throw an error
        throw 'Please set up your storage service. Invalid Storage';
    }
}

module.exports = StorageFactory;
