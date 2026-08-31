const fs = require('fs');

const files = [
  'src/data/products.js',
  'src/pages/Home.jsx',
  'src/pages/FindRange.jsx',
  'src/pages/Experience.jsx',
  'src/pages/About.jsx',
  'src/components/layout/Header/Header.jsx',
  'src/components/layout/Footer/Footer.jsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // For JSX img tags: src="/images/..." -> src={`${import.meta.env.BASE_URL}images/...`}
    content = content.replace(/src="\/images\/(.*?)"/g, 'src={`${import.meta.env.BASE_URL}images/$1`}');
    // For products.js strings: '/images/...' -> `${import.meta.env.BASE_URL}images/...`
    content = content.replace(/'\/images\/(.*?)'/g, '`${import.meta.env.BASE_URL}images/$1`');
    fs.writeFileSync(file, content);
  }
});

const scssFiles = [
  'src/pages/Home.module.scss',
  'src/pages/Experience.module.scss',
  'src/pages/About.module.scss'
];

scssFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/url\('\/images\/(.*?)'\)/g, "url('/traditional-jutti/images/$1')");
    fs.writeFileSync(file, content);
  }
});

console.log('Images fixed!');
