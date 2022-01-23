class NotFound extends Error {
    constructor(dataName){
        super(`${dataName} not found`);
        this.name = "NotFound";
        this.idErro = 0;
    };
};

module.exports = NotFound;