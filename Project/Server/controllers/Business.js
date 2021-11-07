const Business = require("../models/Business");
const Users = require("../models/Users");
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
    const url = req.protocol + '://' + req.get('host');
    try {
        let business = await Business.findOne({ "email": newBusiness.email });




        if (business)
            return res.status(404).send("Sorry this mail is alredy axist");
        if (req.file)
            newBusiness.img = url + '/uploads/' + req.file.filename;

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

    const url = req.protocol + '://' + req.get('host');

    try {
        const business = await Business.findOne({ "_id": id });
        if (!business)
            return res.status(404).send("sorry no such business");
        business.name = businessBody.name !== "null" && businessBody.name || business.name;
        business.phoneNamber = businessBody.phoneNamber !== "null" && businessBody.phoneNamber || business.phoneNamber;
        business.email = businessBody.email !== "null" && businessBody.email || business.email;
        business.adress = businessBody.adress !== "null" && businessBody.adress || business.adress;

        business.img = req.file ? url + '/uploads/' + req.file.filename : business.img;

        business.advertising = businessBody.advertising !== "null" && businessBody.advertising || business.advertising;
        business.userId = businessBody.userId !== "null" && businessBody.userId || business.userId;
        business.listCategory = businessBody.listCategory !== "null" && businessBody.listCategory || business.listCategory;
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
const getListBuisnessByIdUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Users.findOne({ "_id": id });
        if (!user)
            return res.status(404).send("sorry no such user");
        const ListBuisness = await Business.find({ "userId": id })
        return res.send(ListBuisness).status();
    }
    catch{
        return res.status(400);

    }

}

module.exports = {
    getAll, getByPassword, addBusiness, updateBusiness, deleteBusiness, getListBuisnessByIdUser
}