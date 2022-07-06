
import './assets/css/style.css';


import Masc from './modules/Telmasc';

const masc = new Masc('.mascara-cadastro');

masc.init();

// Esse main é usado para importar O CSS e tb para usar a mascara do Telefone.
// O WEBPACK faz ligação do main com bundle, entao nao é necessario chamar o Main dentro do HTML.

/// para usar o webpack usa-se o comando webpack -w
/// para statar a aplicação usa-se nodemon server.js



