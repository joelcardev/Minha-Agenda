const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  usuario: { type: String, required: true },
  password: { type: String, required: true },
});
///// codigo que cria uma ligação com MONGODB

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async registrar() {
    this.valida();

    if (this.errors.length > 0) return;
    await this.userExists();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await LoginModel.create(this.body);

    console.log(e);
  }

  async loginUser() {
    this.validaLogin();
    this.user = await LoginModel.findOne({ email: this.body.email });
    if (!this.user) {
      this.errors.push("Usuario não existente");
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Senha invalida");
      this.user = null;
      return;
    }
  }

  async userExists() {
    const user = await LoginModel.findOne({ email: this.body.email });
    if (user) {
      this.errors.push("Usuario já existente");
    }
  }

  validaLogin() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) this.errors.push("Email invalido");
    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push("A senha precisa ter entre 3 e 50 caracteres.");
    }
  }

  valida() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) this.errors.push("Email invalido");
    if (!this.body.usuario.length > 0)
      this.errors.push("Por favor, digite um usuario valido!");

    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push("A senha precisa ter entre 3 e 50 caracteres.");
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      email: this.body.email,
      usuario: this.body.usuario,
      password: this.body.password,
    };
  }
}

module.exports = Login;
