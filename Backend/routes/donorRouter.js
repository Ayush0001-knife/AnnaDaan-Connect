const express = require("express");
const userRouter = express.Router();
const donorController = require("../controllers/donor.controller");

userRouter.post("/register", donorController.postDonorData);
userRouter.get("/credentials", donorController.getDonorData);


module.exports = userRouter;
