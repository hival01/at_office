const express = require("express");
const route = express.Router();
const controller = require("../controllers/formController");


route.get("/", controller.getform)
route.get("/api/getGender", controller.getGender)
route.get("/api/getRelationship" , controller.getRelationship);
route.get("/api/getState" , controller.getState);
route.get("/api/getCity" , controller.getCity);



module.exports = route;