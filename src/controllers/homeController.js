const { async } = require("regenerator-runtime");
const Contato = require("../models/contatoModel");

exports.index = async (req, res) => {
  try {
    var contato = await Contato.buscarClientes();

    if (contato.length > 0 && req.session.user) {
      res.render("index", { contato });
      return;
    } else if (!req.session.user) {
      contato = "DESLOGADO";
      res.render("index", { contato });
      return;
    } else {
      contato = "vazio";
      res.render("index", { contato });
      return;
    }
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};
