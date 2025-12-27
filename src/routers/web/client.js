const Router = require("express").Router();
const ClientController = require("../../controllers/web/client");
const { jwtAuthenticate } = require("../../middlewares/auth");

Router.post("/createclient", ClientController.createClient);
Router.get("/getclient", ClientController.getClient);
Router.get("/getjumlahclient", ClientController.getJumlahClient);
Router.patch("/updateclient", ClientController.updateClient);
Router.delete("/deleteclient", ClientController.deleteClient);

module.exports = Router;
