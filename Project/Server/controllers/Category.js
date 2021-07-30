const mongoose = require("mongoose");
const Categories = require("../models/CategoryBusiness");
const getAllCategory = async (req, res) => {
    try {
        let categories = await Categories.find();
        return res.send(categories);
    }
    catch(err){
        return res.status(400).send(err.message)
    }
}
const addCategory = async (req, res) => {
    try {
        let category = new Categories(req.body);
        await category.save();
        return res.send(category);
    }
    catch(err){
        return res.status(400).send(err.message)
    }
}

module.exports = { getAllCategory , addCategory}