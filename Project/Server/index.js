const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan")
const users = require("./routes/User");
const business = require("./routes/Business");
const categories = require("./routes/Category");
const tasks = require("./routes/Tasks");
const mails = require("./routes/Mail");



mongoose.connect("mongodb://localhost:27017/truecaller").then(() => {
    console.log("connected to mongo db");
}).catch(err => { console.log(err) })

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

app.use("/users", users);
app.use("/business", business);
app.use("/categories", categories);
app.use("/tasks", tasks);
app.use("/sendMail", mails);

app.listen("4000", () => {
    console.log("listening on port 4000");
})


























