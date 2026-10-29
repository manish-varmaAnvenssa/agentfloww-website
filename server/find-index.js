const fs = require('fs');
const path = require('path');

const possiblePaths = [
  '/home/u430499725/public_html/index.html',
  '/home/u430499725/domains/mediumspringgreen-hedgehog-906387.hostingersite.com/public_html/index.html',
  '/home/u430499725/domains/agentfloww.com/public_html/index.html',
  path.join(__dirname, '..', 'index.html'),
  path.join(__dirname, 'index.html'),
];

console.log('🔍 Searching for index.html on your server...');

let found = false;
possiblePaths.forEach(p => {
  const resolved = path.resolve(p);
  const exists = fs.existsSync(resolved);
  console.log(`- [${exists ? 'FOUND' : 'MISSING'}] ${resolved}`);
  if (exists) found = true;
});

if (!found) {
  console.log('\n❌ Could not find index.html in any of the expected locations.');
  console.log('Please ensure you uploaded the contents of your local "client/dist" folder (not the "client" folder itself) directly into the public_html directory.');
} else {
  console.log('\n✅ Found index.html! Copy it or verify it is in the active public_html path listed in your Node logs.');
}
