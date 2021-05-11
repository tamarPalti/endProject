const express = require("express");
const route=express.Router();
const userController=require("../controllers/User");

route.get("/",userController.getAll);
route.get("/:id",userController.getByPassword);
route.post("/",userController.addUser);
route.put("/:id",userController.updateUser);
route.delete("/:id",userController.deleteUser);
module.exports=route;
