import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { productsData } from '../src/data/productsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(clientRoot, 'dist');
const publicDir = path.resolve(clientRoot, 'public');

const baseUrl = 'https://agentfloww.com';

console.log('--- Starting Build Post-Processing Pipeline ---');

// 1. Export products.json
const productsJsonPathPublic = path.join(publicDir, 'products.json');
const productsJsonPathDist = path.join(distDir, 'products.json');
fs.writeFileSync(productsJsonPathPublic, JSON.stringify(productsData, null, 2), 'utf8');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(productsJsonPathDist, JSON.stringify(productsData, null, 2), 'utf8');
}
console.log('✓ products.json exported to public/ and dist/');

// 2. Define core site pages for sitemap
const staticPages = [
  { path: '/about', priority: '0.9', changefreq: 'monthly' },
  { path: '/products', priority: '0.9', changefreq: 'weekly' },
  { path: '/blogs', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly' },
  { path: '/live-demo', priority: '0.9', changefreq: 'monthly' },
  { path: '/built-erp-native', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
  { path: '/refund-policy', priority: '0.5', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.5', changefreq: 'yearly' }
];

// 3. Generate Updated Static sitemap.xml
const today = new Date().toISOString().split('T')[0];
const sitemapUrls = [
  { loc: `${baseUrl}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' },
  ...staticPages.map(sp => ({ loc: `${baseUrl}${sp.path}`, lastmod: today, changefreq: sp.changefreq, priority: sp.priority })),
  ...Object.values(productsData).map(p => ({ loc: `${baseUrl}${p.url}`, lastmod: today, changefreq: 'weekly', priority: '0.8' }))
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
}
console.log('✓ sitemap.xml updated in public/ and dist/');

// 4. Ensure .htaccess, api.php, sitemap.php are copied to dist/
const filesToCopy = ['sitemap.php', '.htaccess', 'api.php'];
for (const file of filesToCopy) {
  const src = path.join(publicDir, file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src) && fs.existsSync(distDir)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied ${file} to dist/`);
  }
}

// 5. Clean up any stale subdirectories with outdated index.html files in dist/
const staleDirs = [
  'about', 'blogs', 'built-erp-native', 'contact',
  'live-demo', 'privacy-policy', 'products', 'refund-policy', 'terms-of-service'
];
for (const dirName of staleDirs) {
  const stalePath = path.join(distDir, dirName);
  if (fs.existsSync(stalePath)) {
    fs.rmSync(stalePath, { recursive: true, force: true });
    console.log(`✓ Cleaned stale subfolder: ${dirName}/ from dist/`);
  }
}

console.log('--- Post-Processing Pipeline Completed Successfully! ---');
