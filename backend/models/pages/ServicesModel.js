const BaseJSONModel = require('../BaseJSONModel');

class ServicesModel extends BaseJSONModel {
    constructor() {
        super('services.json');
    }
}

module.exports = new ServicesModel();
