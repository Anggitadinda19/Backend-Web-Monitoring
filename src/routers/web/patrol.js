const Router = require("express").Router();
const PatrolController = require("../../controllers/web/patrol");
const { jwtAuthenticate } = require("../../middlewares/auth");
const { upload } = require("../../middlewares/uploadImages");

Router.use(jwtAuthenticate);

Router.post(
  "/createpatrol",
  upload.array("dokumentasi", 2),
  PatrolController.createPatrol
);

Router.get("/getpatrol", PatrolController.getPatrol);
// Router.get("/grafikpatrol",PatrolController.grafikPatrol)
Router.get("/getjumlahpatrol", PatrolController.getJumlahPatrol);

Router.delete("/deletepatrol", PatrolController.deletePatrol);

module.exports = Router;
