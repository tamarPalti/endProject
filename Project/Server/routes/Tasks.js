const express = require("express");
const route=express.Router();
const tasksController=require("../controllers/Tasks");

route.get("/getAllTypeTsks",tasksController.getAllTypeTsks);
route.get("/getAllTask",tasksController.getAllTask);
route.post("/addTypeTsks",tasksController.addTypeTsks);
route.post("/addTask",tasksController.addTask);
route.put("/updateTask/:id",tasksController.updateTask);
route.delete("/deleteTask/:id",tasksController.deleteTask);
module.exports=route;