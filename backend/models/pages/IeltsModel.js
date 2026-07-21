const BaseJSONModel = require('../BaseJSONModel');

class IeltsModel extends BaseJSONModel {
    constructor() {
        super('ielts.json');
    }
}

module.exports = new IeltsModel();
