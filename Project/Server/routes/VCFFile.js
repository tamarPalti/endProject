const express = require("express");
const route=express.Router();
const vcfController=require("../controllers/VCFFile");

route.post("/createVCFFile",vcfController.createFile);

module.exports=route;