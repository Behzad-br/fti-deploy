const BaseJSONModel = require('../BaseJSONModel');

class HomeModel extends BaseJSONModel {
    constructor() {
        super('home.json');
    }
}

module.exports = new HomeModel();
