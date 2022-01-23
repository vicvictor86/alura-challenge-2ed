class InsuficientFields extends Error {
    constructor(){
        super("Please fill in all fields");
        this.name = "InsuficientFields";
        this.idErro = 0;
    };
};

module.exports = InsuficientFields;