const express = require("express");
const route=express.Router();
const businessController=require("../controllers/Business");
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
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"||file.mimetype == "image/NEF") {
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




route.get("/",businessController.getAll);
route.get("/:id",businessController.getByPassword);
route.get("/getListBuisnessByIdUser/:id",businessController.getListBuisnessByIdUser);

route.post("/",upload.single('img'),businessController.addBusiness);

route.  put("/:id",upload.single('img'),businessController.updateBusiness);
route.delete("/:id",businessController.deleteBusiness);
module.exports=route;
