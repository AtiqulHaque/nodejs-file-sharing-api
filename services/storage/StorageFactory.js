const LocalStorageService = require("./LocalStorageService");

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

        
        if(process.env.STORAGE === "local" || typeof process.env.storage  === "undefined"){
            if(implementsInterface(LocalStorage, StorageInterface)){
                return LocalStorage;
            }
        } else if(process.env.STORAGE === "S3"){
            if(implementsInterface(LocalStorage, StorageInterface)){
                return LocalStorage;
            }
        }

        throw "Ivalid Storage"; 
    }
    
}

module.exports = StorageFactory