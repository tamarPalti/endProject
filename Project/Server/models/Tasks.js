const mongoose = require("mongoose");
const tasksSchema = new mongoose.Schema({
    status: { type:Boolean, required: true },
    type: { type: String, required: true },
    desription:{type:mongoose.SchemaTypes.String,required:true},
    codeUser:{type:mongoose.SchemaTypes.ObjectId,ref:'users'}
});
const Tasks = mongoose.model("actions", tasksSchema);
module.exports = Tasks;