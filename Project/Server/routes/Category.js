const express = require("express");
const route=express.Router();
const categoryController=require("../controllers/Category");

route.get("/",categoryController.getAllCategory);
route.post("/",categoryController.addCategory);

module.exports=route;