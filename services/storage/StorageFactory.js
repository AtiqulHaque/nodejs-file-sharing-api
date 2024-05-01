const LocalStorageService = require("./LocalStorageService");
const app_settings = require("./../../settings/app");


const StorageInterface = {
    uploadFile: function () { },
    getFile: function (param1, param2) { },
    deleteFile : function(){}
};


function implementsInterface(obj, interfaceObj) {
    for (const method in interfaceObj) {
        if (!(method in obj) || 
            typeof obj[method] !== "function") {
            return false;
        }
    }
    return true;
}


const LocalStorage = new LocalStorageService();

class StorageFactory{
    static getStorageObject(){

        
        if(app_settings.storage === "local" || typeof app_settings.storage  === "undefined"){
            if(implementsInterface(LocalStorage, StorageInterface)){
                return LocalStorage;
            }
        } else if(app_settings.storage === "S3"){
            if(implementsInterface(LocalStorage, StorageInterface)){
                return LocalStorage;
            }
        }

        throw "Please setup your storage service. Ivalid Storage"; 
    }
    
}

module.exports = StorageFactory