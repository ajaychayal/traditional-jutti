const fs = require('fs');

const scssFiles = [
  { path: 'src/pages/Home.module.scss', depth: '../../' },
  { path: 'src/pages/Experience.module.scss', depth: '../../' },
  { path: 'src/pages/About.module.scss', depth: '../../' }
];

scssFiles.forEach(file => {
  if (fs.existsSync(file.path)) {
    let content = fs.readFileSync(file.path, 'utf8');
    // We replace the hardcoded '/traditional-jutti/images/' with relative paths to the public directory
    content = content.replace(/url\('\/traditional-jutti\/images\/(.*?)'\)/g, `url('${file.depth}public/images/$1')`);
    fs.writeFileSync(file.path, content);
  }
});

console.log('SCSS fixed!');
