const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan")
const users = require("./routes/User");
const searchUsers = require("./routes/SearchUsers");
mongoose.connect("mongodb://localhost:27017/truecaller").then(() => {
    console.log("connected to mongo db");
}).catch(err => { console.log(err) })

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


app.use("/users", users);
app.use("/searchUsers", searchUsers);
app.listen("4000", () => {
    console.log("listening on port 3001");
})