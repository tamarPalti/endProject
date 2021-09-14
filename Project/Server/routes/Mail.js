const express = require("express");
const route = express.Router();
const mailsController = require("../controllers/SendMail");


route.post("/sendMail", mailsController.sendMailcontroller);

module.exports = route;