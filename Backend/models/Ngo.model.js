const mongoose = require("mongoose");

const NgoSchema = new mongoose.Schema({
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

module.exports = mongoose.model("NgoCredentials", NgoSchema);
