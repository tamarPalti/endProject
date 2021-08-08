const express = require("express");
const route=express.Router();
const userController=require("../controllers/User");

route.get("/",userController.getAll);
route.get("/:id",userController.getByPassword);
route.post("/",userController.addUser);
route.put("/:id",userController.updateUser);
route.put("/addToHistory/:currentId&:userId",userController.addToHistory);
route.put("/addToHistoryBusiness/:currentId&:businessId",userController.addToHistoryBusiness);
route.delete("/:id",userController.deleteUser);
route.get("/getByPassword/:password&:mail",userController.getByPasswordAndMail);
module.exports=route;
