const Entity = require("./Entity");
//const cliente1 = new Cliente("Luiz", 31, "contato@luiztools.com.br");

class HistoryElement  {
    //propriedades e funções da classe aqui
    constructor(move_from, move_to, comment, appendage) {
        this.move_from = move_from;
        this.move_to = move_to;
        this.comment = comment;
        this.appendage = appendage;
        this.registerTime = new Date();
    }
}

module.exports = HistoryElement;