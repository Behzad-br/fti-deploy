const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'fti-journey-main/src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // We need to import API_BASE_URL if we are going to use it.
  const hasFetchApi = content.includes("fetch('/api") || content.includes("fetch(`/api");
  
  if (hasFetchApi) {
    // Calculate relative path to src/config/api
    const fileDir = path.dirname(file);
    let relPath = path.relative(fileDir, path.join(srcDir, 'config', 'api')).replace(/\\/g, '/');
    if (!relPath.startsWith('.')) {
      relPath = './' + relPath;
    }

    if (!content.includes('API_BASE_URL')) {
      const importStatement = `import { API_BASE_URL } from '${relPath}';\n`;
      content = importStatement + content;
    }

    // Replace fetch('/api/...
    content = content.replace(/fetch\('\/api\/([^']+)'/g, 'fetch(`${API_BASE_URL}/$1`');
    // Replace fetch(`/api/...
    content = content.replace(/fetch\(`\/api\/([^`]+)`/g, 'fetch(`${API_BASE_URL}/$1`');

    changed = true;
  }

  // Also fix the CMSContext base URL
  if (file.includes('CMSContext.tsx') && content.includes('http://localhost:5000/api')) {
    content = content.replace(
      "const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';",
      "const baseURL = API_BASE_URL;"
    );
    if (!content.includes('API_BASE_URL')) {
      const fileDir = path.dirname(file);
      let relPath = path.relative(fileDir, path.join(srcDir, 'config', 'api')).replace(/\\/g, '/');
      if (!relPath.startsWith('.')) {
        relPath = './' + relPath;
      }
      content = `import { API_BASE_URL } from '${relPath}';\n` + content;
    }
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', file);
  }
});

console.log('Refactoring complete.');
