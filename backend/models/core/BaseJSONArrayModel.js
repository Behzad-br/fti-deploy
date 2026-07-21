const fs = require('fs');
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
            console.error(`Error reading ${this.filepath}:`, error);
            return [];
        }
    }

    saveAll(dataArray) {
        try {
            fs.writeFileSync(this.filepath, JSON.stringify(dataArray, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error(`Error writing ${this.filepath}:`, error);
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
