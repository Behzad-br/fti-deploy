const BaseJSONModel = require('../BaseJSONModel');

class ContactModel extends BaseJSONModel {
    constructor() {
        super('contact.json');
    }
}

module.exports = new ContactModel();
