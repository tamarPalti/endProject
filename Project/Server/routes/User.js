const express = require("express");
const route = express.Router();
const userController = require("../controllers/User");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {

        cb(null, new Date().toDateString() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}

const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5
    }
    , fileFilter: fileFilter
});


route.get("/", userController.getAll);
route.get("/:id", userController.getByPassword);
route.get("/getByPassword/:password&:mail", userController.getByPasswordAndMail);

route.post("/", upload.single('img'), userController.addUser);

route.put("/:id", upload.single('img'), userController.updateUser);
route.put("/addToHistory/:currentId&:userId", userController.addToHistory);
route.put("/addToHistoryBusiness/:currentId&:businessId", userController.addToHistoryBusiness);
route.put("/deleteHistoryUser/:currentId&:index", userController.deleteHistoryUser);
route.put("/deleteHistoryBusiness/:currentId&:index", userController.deleteHistoryBusiness);

route.delete("/:id", userController.deleteUser);

module.exports = route;
