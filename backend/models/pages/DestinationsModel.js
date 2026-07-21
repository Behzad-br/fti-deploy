const BaseJSONModel = require('../BaseJSONModel');

class DestinationsModel extends BaseJSONModel {
    constructor() {
        super('destinations.json');
    }
}

module.exports = new DestinationsModel();
