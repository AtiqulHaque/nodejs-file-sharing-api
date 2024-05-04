const express = require("express");
const router = express.Router();

const {queueTask} = require("../controllers/tasks");

router.post("/queue", queueTask);


module.exports = router