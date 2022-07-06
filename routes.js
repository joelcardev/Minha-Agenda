const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contatoController = require("./src/controllers/contatoController");
const { loginRequired } = require("./src/middlewares/middleware");

// Rotas da home
route.get("/", homeController.index);

route.get("/login/index", loginController.index);
route.post("/login/registrar", loginController.registrar);
route.post("/login/entrar", loginController.entrar);
route.get("/login/logout", loginController.logout);
route.get("/cadcontatos", loginRequired, contatoController.index);
route.post(
  "/cadcontatos/registrar",
  loginRequired,
  contatoController.registrar
);
route.get("/cadcontatos/:id", loginRequired, contatoController.edit);
route.post("/cadcontatos/:id", loginRequired, contatoController.editarContato);
route.get("/cadcontatos/delete/:id", loginRequired, contatoController.delete);
route.post("/pesquisar", loginRequired, contatoController.pesquisar);
// Rotas de contato

module.exports = route;
