const Router = require("express").Router();
const TrainingController = require("../../controllers/web/training");
const { jwtAuthenticate } = require("../../middlewares/auth");
const { upload } = require("../../middlewares/uploadImages");

Router.post(
  "/createtraining",
  upload.array("dokumentasi", 2),
  TrainingController.createTraining
);
Router.get("/gettraining", TrainingController.getTraining);
Router.get("/getjumlahtraining", TrainingController.getJumlahTraining);
Router.get("/grafiktraining", TrainingController.grafikTraining);
Router.delete("/deletetraining", TrainingController.deleteTraining);

module.exports = Router;
