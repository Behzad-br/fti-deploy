const fs = require('fs');
const path = require('path');

const pages = ['home', 'about', 'ielts', 'pte', 'destinations', 'services', 'events', 'contact'];

const dataDir = path.join(__dirname, 'backend', 'data', 'pages');
const modelsDir = path.join(__dirname, 'backend', 'models', 'pages');
const controllersDir = path.join(__dirname, 'backend', 'controllers', 'pages');

[dataDir, modelsDir, controllersDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

pages.forEach(page => {
    const Name = page.charAt(0).toUpperCase() + page.slice(1);
    
    // Create Data files (empty JSON)
    fs.writeFileSync(path.join(dataDir, `${page}.json`), '{}');
    
    // Create Model files
    const modelContent = `const BaseJSONModel = require('../BaseJSONModel');

class ${Name}Model extends BaseJSONModel {
    constructor() {
        super('${page}.json');
    }
}

module.exports = new ${Name}Model();
`;
    fs.writeFileSync(path.join(modelsDir, `${Name}Model.js`), modelContent);

    // Create Controller files
    const controllerContent = `const ${Name}Model = require('../../models/pages/${Name}Model');

const get${Name}Data = async (req, res) => {
    try {
        const data = ${Name}Model.getData();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const update${Name}Data = async (req, res) => {
    try {
        const updatedData = ${Name}Model.updateData(req.body);
        res.json(updatedData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    get${Name}Data,
    update${Name}Data
};
`;
    fs.writeFileSync(path.join(controllersDir, `${page}.controller.js`), controllerContent);
});

console.log('Generated models, controllers, and data files.');
