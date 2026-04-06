const express = require("express");
const route = express.Router();
const controller = require("../controllers/formController");


route.get("/", controller.getform)
route.get("/api/getGender", controller.getGender)
route.get("/api/getRelationship" , controller.getRelationship);
route.get("/api/getState" , controller.getState);
route.get("/api/getCity" , controller.getCity);
route.get("/api/getPrefLocation" , controller.getPrefLocation);
route.get("/api/getPrefDepartment" , controller.getPrefDepartment);
route.get("/show/:id" , controller.getUser);

route.post("/api/submit", controller.submit);



module.exports = route;