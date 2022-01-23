class NotFound extends Error {
    constructor(){
        super("Data not not found");
        this.name = "NotFound";
        this.idErro = 0;
    };
};

module.exports = NotFound;