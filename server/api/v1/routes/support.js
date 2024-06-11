const router = require("express").Router();

router.post("/postTicket", postTicket);

module.exports = { router }