 
class Entity  {
    //propriedades e funções da classe aqui
    constructor(name, description, indexed_id, authority) {
        this.name = name;
        this.description = description;
        this.indexed_id = indexed_id;
        this.authority = authority;
        this.registerTime = new Date();
    }
}

module.exports = Entity;