const express = require("express");
const ngoRouter = express.Router();
const ngoController = require("../controllers/ngo.controller");

ngoRouter.post("/register", ngoController.postNgoData);
ngoRouter.get("/credentials", ngoController.getNgoData);



module.exports = ngoRouter;