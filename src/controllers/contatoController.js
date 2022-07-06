const Contato = require("../models/contatoModel");

exports.index = (req, res) => {
  res.render("cadcontatos", {
    contato: {},
  });
  return;
};

exports.registrar = async function (req, res) {
  try {
    const contato = new Contato(req.body);
    await contato.registrar();

    if (contato.errors.length > 0) {
    
      req.flash("errors", contato.errors);
      req.session.save(function () {
        return res.redirect("/cadcontatos");
      });
      return;
    }

    req.flash("success", "Contato cadastrado com sucesso");
    req.session.save(function () {
      return res.redirect(`/cadcontatos/${contato.contato._id}`);
    });

    return;
  } catch (e) {
    console.log(e);

    res.render("404");
  }
};

exports.editarContato = async function (req, res) {
  try {
    if (!req.params.id) return res.render("404");

    const contato = new Contato(req.body);
    await contato.editarContato(req.params.id);
    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(function () {
        return res.redirect("/cadcontatos");
      });
      return;
    }

    req.flash("success", "Contato editado com sucesso");
    req.session.save(function () {
      return res.redirect(`/cadcontatos/${contato.contato._id}`);
    });
  } catch (e) {
    console.log(e);

    return res.render("404");
  }
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.render("404");

    const contato = await Contato.buscaPorId(req.params.id);
    console.log(req.params.id);
    if (!contato) return res.render("404");

    res.render("cadcontatos", { contato });
  } catch (e) {
    return res.render("404");
  }
};

exports.pesquisar = async function (req, res) {
  try {
    console.log("passou");

    const contatos = new Contato(req.body);
    const contato = await contatos.pesquisarContato(req.body.nome);

    if (contatos.errors.length > 0) {
      req.flash("errors", contatos.errors);
      console.log(contatos.errors);
      res.redirect("/");
      return;
    }

    res.render("index", { contato });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.delete = async function (req, res) {
  try {
    const contato = await Contato.deleteContato(req.params.id);
    if (!contato) return res.render("404");

    req.flash("success", "Contato excluido com sucesso");
    req.session.save(function () {
      return res.redirect("/");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};
