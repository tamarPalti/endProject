const Users = require("../models/Users")
const mongoose = require("mongoose");
const getAll = async (req, res) => {
    try {
        let users = await Users.find().sort({ firstName: 1, lastName: 1 });
        return res.send(users);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const getByPassword = async (req, res) => {
    let { password, email } = req.params;
    try {
        let user = await Users.findOne({ "password": password, "email": email });
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
            return res.status(404).send("sorry no such user");
        return res.send(user).status();
    }
    catch{
        return res.status(400);

    }

}
module.exports = {
    getAll, getByPassword, addUser, updateUser,deleteUser
}