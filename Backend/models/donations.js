const mongoose = require("mongoose");


const donationsSchema = new mongoose.Schema({
   contact:{
    type: String,
    required: true,
   },
   name:{
    type: String,
    required: true,
   },
   type:{
    type: String,
    required: true,
   },
   quantity:{
    type: Number,
    required: true,
   },
   expiration:{
    type: Number,
    required: true,
   },
   postTiming:{
    type:String,
    required:true,
   },
   status:{
      type:String,
      default:"active",
   }
})

module.exports = mongoose.model("Donations", donationsSchema);