const Router = require("express").Router();
const UserController = require("../../controllers/web/User");
const { jwtAuthenticate } = require("../../middlewares/auth");

Router.post("/loginweb", UserController.loginWeb);
// Router.get("/me", jwtAuthenticate, UserController.getProfile);
Router.get("/refresh", jwtAuthenticate, UserController.refresh);
Router.post("/createuser", UserController.createUser);
Router.get("/getuser", UserController.getUser);
Router.get("/getjumlahuser", UserController.getJumlahUser);
Router.patch("/updateuser", UserController.updateUser);
Router.delete("/deleteuser", UserController.deleteUser);

module.exports = Router;
