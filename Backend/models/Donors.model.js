const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userType:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("DonorsCredentials", donorSchema);
