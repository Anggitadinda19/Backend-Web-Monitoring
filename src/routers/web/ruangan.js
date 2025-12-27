const Router = require("express").Router();
const RuanganController = require("../../controllers/web/ruangan");
const { jwtAuthenticate } = require("../../middlewares/auth");

Router.post("/createruangan", RuanganController.createRuangan);
Router.get("/getruangan", RuanganController.getRuangan);
Router.get("/getjumlahruangan", RuanganController.getJumlahRuangan);
Router.delete("/deleteruangan", RuanganController.deleteRuangan);

module.exports = Router;
