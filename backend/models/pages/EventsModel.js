const BaseJSONModel = require('../BaseJSONModel');

class EventsModel extends BaseJSONModel {
    constructor() {
        super('events.json');
    }
}

module.exports = new EventsModel();
