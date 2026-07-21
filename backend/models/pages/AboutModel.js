const BaseJSONModel = require('../BaseJSONModel');

class AboutModel extends BaseJSONModel {
    constructor() {
        super('about.json');
    }
}

module.exports = new AboutModel();
