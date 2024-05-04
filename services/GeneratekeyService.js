const uuid = require('uuid');
const crypto = require('crypto');

/**
 * @description Service for Generating Public and Private Keys
 * @class GenerateKeyService
 * @date 04/05/2024
 */
class GenerateKeyService {
    /**
     * Creates an instance of GenerateKeyService.
     * @param {*} length - The length of the keys to be generated
     * @memberof GenerateKeyService
     */
    constructor(length) {
        // Set the length of the keys
        this.keyLength = length || 16;
    }

    /**
     * @description Generate public and private keys
     * @returns {*} - Object containing generated public and private keys
     * @memberof GenerateKeyService
     */
    getKeys() {
        // Generate random bytes and convert them to hexadecimal strings for both public and private keys
        return {
            publicKey: crypto.randomBytes(this.keyLength).toString('hex'),
            privateKey: crypto.randomBytes(this.keyLength).toString('hex'),
        };
    }
}

module.exports = GenerateKeyService;
