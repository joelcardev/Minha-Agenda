export default class Telmasc {
  constructor(formClass) {
    console.log(formClass);
    this.form = document.querySelector(formClass);
    console.log(this.form);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener("keyup", (e) => {
      e.preventDefault();

      this.mascaraFone(e);
    });
  }

  mascaraFone(event) {
    console.log("asdasdsads");
    var valor = "";
    valor = document.querySelector(".mascara-cadastro").value;
    console.log(valor);
    var retorno = valor.replace(/\D/g, "");
    retorno = retorno.replace(/^0/, "");
    if (retorno.length > 10) {
      retorno = retorno.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (retorno.length > 5) {
      if (retorno.length == 6 && event.code == "Backspace") {
        // necessário pois senão o "-" fica sempre voltando ao dar backspace
        return;
      }
      retorno = retorno.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (retorno.length > 2) {
      retorno = retorno.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
      if (retorno.length != 0) {
        retorno = retorno.replace(/^(\d*)/, "($1");
      }
    }
    document.getElementById("tele").attributes[0].ownerElement["value"] =
      retorno;
  }
}
