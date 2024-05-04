/**
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
async function home(req, res, next) {
    try {
        res.json('Pong');
    } catch (err) {
        next(err);
    }
}

module.exports = {
    home,
};
