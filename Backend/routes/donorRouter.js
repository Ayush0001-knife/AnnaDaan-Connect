const express = require("express");
const userRouter = express.Router();
const donorController = require("../controllers/donor.controller");

userRouter.post("/register", donorController.postDonorData);
userRouter.get("/credentials", donorController.getDonorData);
userRouter.post("/donations", donorController.postDonations);
userRouter.get("/donations-data" , donorController.getDonations )
userRouter.delete("/remove-donations/:id", donorController.deleteDonations);



module.exports = userRouter;
