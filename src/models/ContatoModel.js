const mongoose = require("mongoose");
const validator = require("validator");

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: false, default: "" },
  telefone: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.registrar = async function () {
  this.valida();

  if (this.errors.length > 0) return;
  this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.editarContato = async function (id) {
  if(typeof id !== 'string') return;

  this.valida();
  if (this.errors.length > 0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new:true});

};

Contato.prototype.valida = function () {
  this.cleanUp();

  if (this.body.nome == "") {
    this.errors.push("Por favor, digite um nome valido!");
  }
  if (this.body.email && !validator.isEmail(this.body.email))
    this.errors.push("Email invalido");

  if (this.body.telefone.length < 8) {
    this.errors.push("O telefone precisa ter mais de 8 numeros");
  }
};

Contato.buscaPorId = async function (id) {
  if (typeof id !== "string") return;
  const user = await ContatoModel.findById(id);
  return user;
};


Contato.buscarClientes = async function () {
  
  const contatos = await ContatoModel.find()
  .sort({criadoEm:-1});

  return contatos;
};



Contato.deleteContato = async function (id) {
  const contatos = await ContatoModel.findOneAndDelete();
  return contatos;
};

Contato.prototype.pesquisarContato = async function (query) {

  this.cleanUp();

  
  if (!this.body.nome.length > 0) {
    this.errors.push("Por favor, digite um nome valido!");
  }
  if (this.errors.length > 0) {
     const contato = ''; 
     return contato;
  } 
  const contato = await ContatoModel.find({nome:{$regex : query, $options: 'i'}});
  
  return contato;
};


Contato.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== "string") {
      this.body[key] = "";
    }
  }

  this.body = {
    nome: this.body.nome,
    email: this.body.email,
    telefone: this.body.telefone,
  };
};







module.exports = Contato;
