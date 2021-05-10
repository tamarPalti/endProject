const express = require("express");
const route=express.Router();
const userController=require("../controllers/SearchUsers");

route.get("/",userController.SearchUsers);
route.get("/:id");
route.post("/");
route.put("/:id");
module.exports=route;
