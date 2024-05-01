const {createWrapper} = require("../../utilities/newrelic");

const logger = require('../../utilities/logger');

const {lookupCategoriesFromTalroo} = require("../../services/keyword_lookup")
const CompanyService = require("../../services/CompanyService")
const {postMessageToQueue} = require("../../utilities/bullmq");

const TASKS = {
    init, handleOne,
};

module.exports = async (job) => {
    const {name, data} = job;
    const handler = TASKS[name];
    if (!handler) throw new Error("Invalid job name passed");

    const wrappedHandler = createWrapper("ping", name, handler);
    return await wrappedHandler(data);
};

async function init() {
    const companyService = new CompanyService();
    const allCompanies = await companyService.getAllCompanies();

    for (const company of allCompanies) {
        await postMessageToQueue("keyword_lookup", "handleOne", {company})
    }


}


async function handleOne({company}) {
    const relatedKeywords = await lookupCategoriesFromTalroo(company.display_name.toLowerCase())

    const companyService = new CompanyService();
    const companyInstance = await companyService.getCompany(company._id)

    if (relatedKeywords.length) {
        companyInstance.talroo_related_keywords = relatedKeywords
    }

    await companyInstance.save()

    logger.info(`Updated: ${company.display_name}`)

}
