const mongoose = require("mongoose");
const typeTasksSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    code: { type: mongoose.SchemaTypes.Number, required: true }
});
const TypeTsks = mongoose.model("typeActions", typeTasksSchema);
module.exports = TypeTsks;