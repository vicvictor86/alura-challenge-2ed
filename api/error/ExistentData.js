class ExistentData extends Error {
    constructor(dataName){
        super(`${dataName} already exists`);
        this.name = "ExistentData";
        this.idErro = 0;
    };
};

module.exports = ExistentData;