const express = require("express");
const route=express.Router();
const businessController=require("../controllers/Business");

route.get("/",businessController.getAll);
route.get("/:id",businessController.getByPassword);
route.get("/getListBuisnessByIdUser/:id",businessController.getListBuisnessByIdUser);
route.post("/",businessController.addBusiness);
route.put("/:id",businessController.updateBusiness);
route.delete("/:id",businessController.deleteBusiness);
module.exports=route;
