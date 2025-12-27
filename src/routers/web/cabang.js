const Router = require("express").Router();
const CabangController = require("../../controllers/web/cabang");
const { jwtAuthenticate } = require("../../middlewares/auth");

Router.post("/createcabang", CabangController.createCabang);
Router.get("/getcabang", CabangController.getCabang);
Router.get("/getjumlahcabang", CabangController.getJumlahCabang);
Router.patch("/updatecabang", CabangController.updateCabang);
Router.delete("/deletecabang", CabangController.deleteCabang);

module.exports = Router;
