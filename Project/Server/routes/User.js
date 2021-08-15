const express = require("express");
const route=express.Router();
const userController=require("../controllers/User");

route.get("/",userController.getAll);
route.get("/:id",userController.getByPassword);
route.get("/getByPassword/:password&:mail",userController.getByPasswordAndMail);
route.post("/",userController.addUser);
route.put("/:id",userController.updateUser);
route.put("/addToHistory/:currentId&:userId",userController.addToHistory);
route.put("/addToHistoryBusiness/:currentId&:businessId",userController.addToHistoryBusiness);
route.put("/deleteHistoryUser/:currentId&:index",userController.deleteHistoryUser);
route.put("/deleteHistoryBusiness/:currentId&:index",userController.deleteHistoryBusiness);
route.delete("/:id",userController.deleteUser);

module.exports=route;
