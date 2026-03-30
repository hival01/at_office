const express = require("express");
const route = express.Router();
const controller = require("../controllers/formController");


route.get("/", controller.getform)
route.get("/api/getGender", controller.getGender)
route.get("/api/getRelationship" , controller.getRelationship);



module.exports = route;