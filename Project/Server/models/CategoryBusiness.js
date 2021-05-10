const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true }
});
const Category = mongoose.model("category", categorySchema);
module.exports = Category;