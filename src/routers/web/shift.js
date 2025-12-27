const Router = require("express").Router();
const ShiftController = require("../../controllers/web/shift");
const { jwtAuthenticate } = require("../../middlewares/auth");

Router.post("/createshift", ShiftController.createShift);
Router.get("/getshift", ShiftController.getShift);
Router.get("/getjumlahshift", ShiftController.getJumlahShift);
Router.delete("/deleteshift", ShiftController.deleteShift);

module.exports = Router;
