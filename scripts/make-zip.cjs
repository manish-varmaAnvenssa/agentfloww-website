const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const distDir = path.resolve(__dirname, '../client/dist');
const zipCore = path.resolve(__dirname, '../hostinger-dist-core.zip');

if (fs.existsSync(zipCore)) {
  fs.unlinkSync(zipCore);
}

// Temporary staging directory without images
const stageDir = path.resolve(__dirname, '../.stage-dist');
if (fs.existsSync(stageDir)) {
  fs.rmSync(stageDir, { recursive: true, force: true });
}
fs.mkdirSync(stageDir, { recursive: true });

for (const item of fs.readdirSync(distDir)) {
  if (item === 'images') continue;
  const src = path.join(distDir, item);
  const dest = path.join(stageDir, item);
  fs.cpSync(src, dest, { recursive: true });
}

console.log('Staged files for core zip (excluding images):', fs.readdirSync(stageDir));

// Create zip using PowerShell System.IO.Compression.ZipFile
const psScript = `
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory('${stageDir.replace(/\\/g, '/')}', '${zipCore.replace(/\\/g, '/')}')
`;

cp.execSync('powershell -NoProfile -Command "' + psScript.replace(/\r?\n/g, '; ') + '"');

console.log('Created hostinger-dist-core.zip with size:', fs.statSync(zipCore).size);

// Cleanup staging
fs.rmSync(stageDir, { recursive: true, force: true });
