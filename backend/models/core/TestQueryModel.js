const BaseJSONArrayModel = require('./BaseJSONArrayModel');

class TestQueryModel extends BaseJSONArrayModel {
    constructor() {
        super('test_queries.json');
    }
}
module.exports = new TestQueryModel();
