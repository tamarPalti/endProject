const mongoose = require("mongoose");
const tasksSchema = new mongoose.Schema({
    status: { type: Boolean, required: true },
    type: { type: mongoose.SchemaTypes.ObjectId, ref: 'typeActions', required: true },
    desription: { type: mongoose.SchemaTypes.String, required: true },
    codeUser: { type: mongoose.SchemaTypes.ObjectId, ref: 'users' },
    otherUser: { type: mongoose.SchemaTypes.ObjectId, ref: 'users' },
    date: { type: mongoose.SchemaTypes.Date, required: true }
});
const Tasks = mongoose.model("actions", tasksSchema);
module.exports = Tasks;