const BaseJSONModel = require('../BaseJSONModel');

class PteModel extends BaseJSONModel {
    constructor() {
        super('pte.json');
    }
}

module.exports = new PteModel();
