const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/behzad/Desktop/fti/fti-journey-main/fti-journey-main/src/features/destinations';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('<Info ')) {
    content = content.replace(/from\s+['"]lucide-react['"]/g, "from 'lucide-react'");
    const lucideRegex = /import\s+\{([^}]+)\}\s+from\s+'lucide-react'/;
    
    content = content.replace(lucideRegex, (match, p1) => {
       if(!p1.includes('Info')) {
           return `import { Info, ${p1.trim()} } from 'lucide-react'`;
       }
       return match;
    });
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${file}`);
  }
});
