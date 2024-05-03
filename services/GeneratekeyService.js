
const uuid = require('uuid');
const crypto = require('crypto')

class GenerateKeyService {

    constructor(length) {
        this.keyLength = length || 16;
    }


    getKeys(){
        return {
            "publicKey" :crypto.randomBytes(this.keyLength).toString('hex'),
            "privateKey" : crypto.randomBytes(this.keyLength).toString('hex')
        }
    }
}

module.exports = GenerateKeyService;