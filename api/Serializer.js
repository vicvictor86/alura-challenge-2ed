const UnsuportedValue = require("./error/UnsuportedValue");

class Serializer {
    json(data){
        return JSON.stringify(data);
    };

    serialize(data){
        data = this.filterData(data);

        if(this.contentType === 'application/json'){
            return this.json(data);
        }

        throw new UnsuportedValue(this.contentType);
    };

    filterObject(data){
        const newObject = {};

        this.publicField.forEach(field => {
            if(data[field] !== undefined){
                newObject[field] = data[field];
            }
        });

        return newObject;
    };

    filterData(data){
        if(Array.isArray(data)){
            data = data.map(item => {
                return this.filterObject(item);
            });
        }else{
            data = this.filterObject(data);
        }

        return data;
    };
};

class IncomeSerializer extends Serializer{
    constructor(contentType, extraFields){
        super();
        this.contentType = contentType;
        this.publicField = ["id", "description", "value", "dateIncome"].concat(extraFields || []);
    };
}

class ExpenseSerializer extends Serializer{
    constructor(contentType, extraFields){
        super();
        this.contentType = contentType;
        this.publicField = ["id", "description", "value", "dateExpense"].concat(extraFields || []);
    };
};

module.exports = {
    Serializer: Serializer,
    IncomeSerializer: IncomeSerializer,
    ExpenseSerializer: ExpenseSerializer,
    acceptFormats: ["application/json"]
}