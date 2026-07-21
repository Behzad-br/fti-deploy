const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'backend', 'models', 'core');
if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir, { recursive: true });

// 1. BaseJSONArrayModel
const baseArrayContent = `const fs = require('fs');
const path = require('path');

class BaseJSONArrayModel {
    constructor(filename) {
        this.filepath = path.join(__dirname, '../../data', filename);
        this.ensureFileExists();
    }

    ensureFileExists() {
        if (!fs.existsSync(this.filepath)) {
            const dir = path.dirname(this.filepath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(this.filepath, JSON.stringify([]), 'utf8');
        }
    }

    getAll() {
        try {
            const data = fs.readFileSync(this.filepath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error(\`Error reading \${this.filepath}:\`, error);
            return [];
        }
    }

    saveAll(dataArray) {
        try {
            fs.writeFileSync(this.filepath, JSON.stringify(dataArray, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error(\`Error writing \${this.filepath}:\`, error);
            throw error;
        }
    }

    add(item) {
        const data = this.getAll();
        data.push(item);
        this.saveAll(data);
        return item;
    }

    findById(id) {
        const data = this.getAll();
        return data.find(item => item.id === id || item._id === id);
    }

    deleteById(id) {
        let data = this.getAll();
        data = data.filter(item => item.id !== id && item._id !== id);
        this.saveAll(data);
        return true;
    }
}

module.exports = BaseJSONArrayModel;
`;
fs.writeFileSync(path.join(modelsDir, 'BaseJSONArrayModel.js'), baseArrayContent);

// 2. UserModel
const userModelContent = `const BaseJSONArrayModel = require('./BaseJSONArrayModel');

class UserModel extends BaseJSONArrayModel {
    constructor() {
        super('users.json');
    }
    
    findByEmail(email) {
        return this.getAll().find(u => u.email === email);
    }

    updateUser(id, updates) {
        const users = this.getAll();
        const index = users.findIndex(u => u.id === id || u._id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updates };
            this.saveAll(users);
            return users[index];
        }
        return null;
    }
}
module.exports = new UserModel();
`;
fs.writeFileSync(path.join(modelsDir, 'UserModel.js'), userModelContent);

// 3. EnquiryModel
const enquiryModelContent = `const BaseJSONArrayModel = require('./BaseJSONArrayModel');

class EnquiryModel extends BaseJSONArrayModel {
    constructor() {
        super('enquiries.json');
    }
}
module.exports = new EnquiryModel();
`;
fs.writeFileSync(path.join(modelsDir, 'EnquiryModel.js'), enquiryModelContent);

// 4. TestQueryModel
const testQueryModelContent = `const BaseJSONArrayModel = require('./BaseJSONArrayModel');

class TestQueryModel extends BaseJSONArrayModel {
    constructor() {
        super('test_queries.json');
    }
}
module.exports = new TestQueryModel();
`;
fs.writeFileSync(path.join(modelsDir, 'TestQueryModel.js'), testQueryModelContent);

// 5. SettingsModel (this one uses object, so BaseJSONModel)
const settingsModelContent = `const BaseJSONModel = require('../BaseJSONModel');

class SettingsModel extends BaseJSONModel {
    constructor() {
        super('../whatsappSettings.json'); // path relative to data/pages due to BaseJSONModel logic
    }
    
    // Override constructor completely because BaseJSONModel expects 'pages/filename'
}

// Since BaseJSONModel uses \`path.join(__dirname, '../data/pages', filename)\`, we can pass '../whatsappSettings.json'
module.exports = new SettingsModel();
`;
fs.writeFileSync(path.join(modelsDir, 'SettingsModel.js'), settingsModelContent);

console.log('Core models generated.');
