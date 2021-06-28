const Business = require("../models/Business")
const mongoose = require("mongoose");
const getAll = async (req, res) => {
    try {
        let business = await Business.find();
        return res.send(business);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const getByPassword = async (req, res) => {

    let { id } = req.params;
    try {
        let business = await Business.findById(id);
        if (!business)
            return res.status(404).send("מצטערים לא נמצא עסק עם המזהה שהתקבל");
        return res.send(business);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

const addBusiness = async (req, res) => {
    let newBusiness = new Business(req.body);
    try {
        let business = await Business.findOne({ "email": newBusiness.email });
        if (business)
            return res.status(404).send("מצטערים כבר קיים במערכת");
        await newBusiness.save();
        return res.send(newBusiness);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
}
const updateBusiness = async (req, res) => {
    let businessBody = req.body;
    const id = req.params.id;
    try {
        const business = await Business.findOne({ "_id": id });
        if (!business)
            return res.status(404).send("sorry no such business");
        business.name = businessBody.name || business.name;
        business.phoneNamber = businessBody.phoneNamber || business.phoneNamber;
        business.email = businessBody.email || business.email;
        business.adress = businessBody.adress || business.adress;
        business.img = businessBody.img || business.img;
        business.advertising = businessBody.advertising || business.advertising;
        business.userId = businessBody.userId || business.userId;
        business.listCategory = businessBody.listCategory || business.listCategory;
        await business.save();
        return res.send(business);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }

}
const deleteBusiness = async (req, res) => {
    const id = req.params.id;
    try {
        const business = await Business.findOneAndDelete({ "_id": id });
        if (!business)
            return res.status(404).send("sorry no such user");
        return res.send(business).status();
    }
    catch{
        return res.status(400);

    }

}
module.exports = {
    getAll, getByPassword, addBusiness, updateBusiness,deleteBusiness
}