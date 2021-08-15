const Users = require("../models/Users");
const Business = require("../models/Business");
const mongoose = require("mongoose");
const getAll = async (req, res) => {
    try {
        let users = await Users.find().populate(
            [{ path: "lastSearchUsers.userSearch", select: "firstName lastName phoneNamber adress email" },
            { path: "lastSearchBusiness.businessSearch", select: "name" }]).sort({ firstName: 1, lastName: 1 });
        return res.send(users);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const getByPassword = async (req, res) => {

    let { id } = req.params;
    try {
        let user = await Users.findById(id).populate(
            [{ path: "lastSearchUsers.userSearch", select: "firstName lastName phoneNamber adress email" },
            { path: "lastSearchBusiness.businessSearch", select: "name" }]);
        if (!user)
            return res.status(404).send("מצטערים לא נמצא משתמש עם המזהה שהתקבל");
        return res.send(user);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const addUser = async (req, res) => {
    let newUser = new Users(req.body);
    try {
        let user = await Users.findOne({ "email": newUser.email });
        if (user)
            return res.status(404).send("מצטערים כבר קיים במערכת");
        await newUser.save();
        return res.send(newUser);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
}
const updateUser = async (req, res) => {
    let userBody = req.body;
    const id = req.params.id;
    try {
        const user = await Users.findOne({ "_id": id });
        if (!user)
            return res.status(404).send("sorry no such user");
        user.firstName = userBody.firstName || user.firstName;
        user.lastName = userBody.lastName || user.lastName;
        user.phoneNamber = userBody.phoneNamber || user.phoneNamber;
        user.email = userBody.email || user.email;
        user.adress = userBody.adress || user.adress;
        user.img = userBody.img || user.img;
        user.lastSearchUsers = userBody.lastSearchUsers || user.lastSearchUsers;
        user.lastSearchBusiness = userBody.lastSearchBusiness || user.lastSearchBusiness;
        await user.save();
        return res.send(user);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }

}
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Users.findOneAndDelete({ "_id": id });
        if (!user)
            return res.send("sorry no such user").status(404);
        return res.send(user).status();
    }
    catch{
        return res.status(400);
    }
}
const getByPasswordAndMail = async (req, res) => {
    const { password, mail } = req.params;
    try {
        const user = await Users.findOne({ "password": password, "email": mail }).populate(
            [{ path: "lastSearchUsers.userSearch", select: "firstName lastName" },
            { path: "lastSearchBusiness.businessSearch", select: "name" }]);
        if (!user)
            return res.send("sorry no such user").status(300);

        else
            return res.send(user).status();
    }
    catch{
        return res.status(400);
    }
}
const addToHistory = async (req, res) => {
    const { currentId, userId } = req.params;
    try {
        const currenUser = await Users.findOne({ "_id": currentId });
        const addUser = await Users.findOne({ "_id": userId });
        if (!currenUser || !addUser)
            return res.send("sorry no such user").status(300);

        else {
            currenUser.lastSearchUsers.push({"date":new Date(),"userSearch" : addUser});
            await currenUser.save();
            return res.status();
        }

    }
    catch{
        return res.status(400);
    }
}
const addToHistoryBusiness = async (req, res) => {
    const { currentId, businessId } = req.params;
    try {
        const currenUser = await Users.findOne({ "_id": currentId });
        const addBusiness = await Business.findOne({ "_id": businessId });
        if (!currenUser || !addBusiness)
            return res.send("sorry no such user").status(300);

        else {
            currenUser.lastSearchBusiness.push({"date":new Date(),"businessSearch" : addBusiness});
            await currenUser.save();
            return res.status();
        }

    }
    catch{
        return res.status(400);
    }
}
module.exports = {
    getAll, getByPassword, addUser, updateUser, deleteUser, getByPasswordAndMail, addToHistory,addToHistoryBusiness
}