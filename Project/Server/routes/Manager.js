const express = require("express");
const route = express.Router();
const managerController = require("../controllers/Manager");


route.get("/getCountUsers", managerController.getCountUsers);
route.get("/getCountBuisness", managerController.getCountBuisness);
route.get("/getCountAllUserByMonth", managerController.getCountAllUserByMonth);
route.get("/getCountAllBusinessByMonth", managerController.getCountAllBusinessByMonth);
route.get("/getCountSearchBusinessByMonth", managerController.getCountSearchBusinessByMonth);
route.get("/getCountSearchUsersByMonth", managerController.getCountSearchUsersByMonth);

module.exports = route;