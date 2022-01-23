class ExistentIncome extends Error {
    constructor(){
        super("Income already exists");
        this.name = "ExistentIncome";
        this.idErro = 0;
    };
};

module.exports = ExistentIncome;