const express = require("express");
const route = express.Router();
const mailsController = require("../controllers/SendMail");


route.post("/sendMail", mailsController.sendMailcontroller);
route.post("/sendMailOterUser", mailsController.sendMailOterUsercontroller);
route.post("/sendTry", mailsController.sendTry);

module.exports = route;