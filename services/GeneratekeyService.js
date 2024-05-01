
const uuid = require('uuid');

class GenerateKeyService {
    getKeys(){
        return {
            "publicKey" : uuid.v4(),
            "privateKey" : uuid.v4()
        }
    }
}

module.exports = GenerateKeyService;