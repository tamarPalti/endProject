const mongoose = require("mongoose");
const CategoryOfBusinessSchema = new mongoose.Schema({
    codeBusiness: { type: mongoose.SchemaTypes.ObjectId,ref:"business" },
    codeCategory: { type: mongoose.SchemaTypes.ObjectId,ref:"category" }

});
const CategoryOfBusiness = mongoose.model("CategoryOfBusiness", CategoryOfBusinessSchema);
module.exports = CategoryOfBusiness;