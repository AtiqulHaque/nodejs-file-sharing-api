/* module dependencies */
const fs = require('fs');
const DB = require('../../settings/db');

const fileHandler = fs.promises;

const dataPath = __basedir + '/' + DB.host + '/' + DB.name;

class FileModel {
    constructor() {
        this._db = dataPath;
    }

    /**
     * read the database and returns a JSON object
     * @returns {Array}
     */
    read = async () => {
        try {
            const data = await fileHandler.readFile(this._db, 'utf-8');
            return JSON.parse(data.toString());
        } catch (error) {
            throw error;
        }
    };

    /**
     * performs write operations on the database
     * @param {Object} info
     */
    create = async (info) => {
        try {
            const data = (await this.read()) || [];
            data.push(info);
            await fileHandler.writeFile(this._db, JSON.stringify(data));
        } catch (error) {
            throw error;
        }
    };

    /**
     * queries the JSON database to find specified JSON object
     * @param {string} key
     * @returns {Object}
     */
    find = async (key) => {
        try {
            const data = await this.read();

            if (data.length) {
                const byPrivateKey = data.find((element) => element.private_key === key);
                const byPublicKey = data.find((element) => element.public_key === key);
                if (byPrivateKey) {
                    return [byPrivateKey];
                } else if (byPublicKey) {
                    return [byPublicKey];
                } else {
                    return [];
                }
            } else {
                return [];
            }
        } catch (error) {
            throw error;
        }
    };

    /**
     *
     * performs rewrite of JSON objects on the database
     * @param {string} key
     * @param {Object} info
     */
    update = async (key, info) => {
        try {
            const { data } = await this.find(key);
            await this.delete(data.private_key);
            await this.create(info);
        } catch (error) {
            throw error;
        }
    };

    /**
     *
     * performs rewrite of JSON objects on the database
     * @param {string} key
     * @param {Object} info
     */
    updateActivity = async (key, datetime) => {
        try {
            let data = await this.find(key);
            //console.log(data);
            data[0]['uploaded_at'] = datetime;
            await this.delete(data[0].private_key);
            await this.create(data[0]);
        } catch (error) {
            throw error;
        }
    };

    /**
     *
     * deletes specified JSON object from the database
     * @param {string} privateKey
     */
    delete = async (privateKey) => {
        try {
            const data = await this.read();
            if (data.length) {
                const newData = data.filter((element) => element.private_key != privateKey);

                if (!newData) {
                    throw new Error('No data found by this private key.');
                }

                await fileHandler.writeFile(this._db, JSON.stringify(newData));
            } else {
                throw new Error('No data in database');
            }
        } catch (error) {
            throw error;
        }
    };
}

module.exports = FileModel;
