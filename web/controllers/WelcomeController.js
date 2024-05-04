const Response = require("../../utilities/response");

function home(req, res, next) {
    try {
        res.json("Pong");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    home,
};
