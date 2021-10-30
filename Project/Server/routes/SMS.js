const express = require("express");
const route = express.Router();
const mailsController = require("../controllers/SMS");

route.post("/sendSMS", mailsController.sendSMS);


module.exports=route;