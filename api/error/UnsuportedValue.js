class UnsuportedValue extends Error {
    constructor(contentType){
        super(`The content ${contentType} is not supported`);
        this.name = "UnsuportedValue";
        this.idErro = 0;
    };
};

module.exports = UnsuportedValue;