const BaseJSONModel = require('../BaseJSONModel');

class SettingsModel extends BaseJSONModel {
    constructor() {
        super('../whatsappSettings.json'); // path relative to data/pages due to BaseJSONModel logic
    }
    
    // Override constructor completely because BaseJSONModel expects 'pages/filename'
}

// Since BaseJSONModel uses `path.join(__dirname, '../data/pages', filename)`, we can pass '../whatsappSettings.json'
module.exports = new SettingsModel();
