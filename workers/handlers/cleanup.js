const {createWrapper} = require("../../utilities/newrelic");

const logger = require('../../utilities/logger');


const {postMessageToQueue} = require("../../utilities/bullmq");
const FileRepository = require("../../database/repositories/FileRepository");
const FileDeleteService = require("../../services/FileDeleteService");

const TASKS = {
    handleOne,
};

module.exports = async (job) => {
    const {name, data} = job;
    const handler = TASKS[name];
    if (!handler) throw new Error("Invalid job name passed");

    const wrappedHandler = createWrapper("ping", name, handler);
    return await wrappedHandler(data);
};

async function handleOne(file) {

    //Remove that file 
    let FileDeleteServiceObj = new FileDeleteService();
    let response = await FileDeleteServiceObj.deleteFile(file.private_key);

    if(response.status === "success"){
        logger.info(`File ${file.file_name} removed`)
    } else {
        //if any file delte has any issue then 
        //we can add here another queue for further process
    }

}
