const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  dateLogin: { type: mongoose.SchemaTypes.Date, required: true },
  password: { type: mongoose.SchemaTypes.String, required: true },
  firstName: {
    type: mongoose.SchemaTypes.String, required: true, validate: {
      validator: function (value) {
        return value.length >= 2 && value.length <= 11;
      },
      message: value => "minimum 2 chars and max 11 chars" + value
    }
  },
  lastName: {
    type: mongoose.SchemaTypes.String, required: true, validate: {
      validator: function (value) {
        return value.length >= 2 && value.length <= 10;
      },
      message: value => "minimum 2 chars and max 10 chars" + value
    }
  },
  phoneNamber: { type: [String], required: true },
  email: { type: String, required: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'] },
  adress: { type: String },
  img: { type: String },
  ifMessege: { type: Boolean },
  lastSearchUsers: [{
    date: Date,
    userSearch: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users'
    }
  }],
  lastSearchBusiness: [{
    date: Date,
    businessSearch: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'business'
    }
  }]
});
const User = mongoose.model("users", userSchema);
module.exports = User;