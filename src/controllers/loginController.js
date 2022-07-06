const Login = require("../models/LoginModel");

exports.index = (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  return res.render("login");
};

exports.registrar = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.registrar();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return res.redirect("/login/index");
      });
      return;
    }

    req.flash("success", "Usuario criado com sucesso!");
    req.session.save(function () {
      return res.redirect("/login/index");
    });
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};

exports.entrar = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.loginUser();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return res.redirect("/login/index");
      });
      return;
    }

    req.flash("success", "Login feito com sucesso!");
    req.session.user = login.user;
    console.log(login.user);
    req.session.save(function () {
      return res.redirect("/");
    });
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
