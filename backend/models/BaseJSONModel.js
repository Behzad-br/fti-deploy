const fs = require('fs');
const path = require('path');

class BaseJSONModel {
    constructor(filename) {
        this.filepath = path.join(__dirname, '../data/pages', filename);
        this.ensureFileExists();
    }

    ensureFileExists() {
        if (!fs.existsSync(this.filepath)) {
            // Create directory if it doesn't exist
            const dir = path.dirname(this.filepath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            // Create file with empty object
            fs.writeFileSync(this.filepath, JSON.stringify({}), 'utf8');
        }
    }

    getData() {
        try {
            const data = fs.readFileSync(this.filepath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error reading data from ${this.filepath}:`, error);
            return {};
        }
    }

    updateData(updates) {
        try {
            const currentData = this.getData();
            const newData = { ...currentData, ...updates };
            fs.writeFileSync(this.filepath, JSON.stringify(newData, null, 2), 'utf8');
            return newData;
        } catch (error) {
            console.error(`Error writing data to ${this.filepath}:`, error);
            throw error;
        }
    }
}

module.exports = BaseJSONModel;
