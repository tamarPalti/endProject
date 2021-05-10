const mongoose = require("mongoose");
const businessSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    phoneNamber: { type: mongoose.SchemaTypes.String, required: true, unique: true },
    email: { type: mongoose.SchemaTypes.String, required: true, unique: true },
    adress: { type: mongoose.SchemaTypes.String, required: true },
    img: { type: mongoose.SchemaTypes.String },
    advertising: { type: [mongoose.SchemaTypes.String] },
    userId: { type: mongoose.SchemaTypes.ObjectId,ref:"users"},
    listCategory:{type:[String],required:true}
});
const Business = mongoose.model("business", businessSchema);
module.exports = Business;