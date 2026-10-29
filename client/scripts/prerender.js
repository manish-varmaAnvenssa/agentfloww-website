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
const defaultImage = `${baseUrl}/images/logo/Agentflow only svg.svg`;

console.log('--- Starting Prerender & SEO Pipeline ---');

// 1. Export products.json for PHP dynamic renderer and static builds
const productsJsonPathPublic = path.join(publicDir, 'products.json');
const productsJsonPathDist = path.join(distDir, 'products.json');
fs.writeFileSync(productsJsonPathPublic, JSON.stringify(productsData, null, 2), 'utf8');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(productsJsonPathDist, JSON.stringify(productsData, null, 2), 'utf8');
}
console.log('✓ products.json exported to public/ and dist/');

// 2. Read base index.html template from dist
const templatePath = path.join(distDir, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('Error: client/dist/index.html not found! Run vite build first.');
  process.exit(1);
}
const baseHtml = fs.readFileSync(templatePath, 'utf8');

// Helper to inject SEO tags and semantic content
function buildPageHtml({ title, description, canonical, ogImage, extraHead = '', bodyContent = '' }) {
  let html = baseHtml;

  // Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);

  // Meta description
  if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${description}" />`);
  } else {
    extraHead += `\n    <meta name="description" content="${description}" />`;
  }

  // SEO Head Tags
  const headSnippet = `
    <!-- Prerendered Static SEO Tags -->
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${ogImage || defaultImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImage || defaultImage}" />
    ${extraHead}
  `;
  html = html.replace('</head>', `${headSnippet}\n  </head>`);

  // Body Content inside <div id="root">
  if (bodyContent) {
    html = html.replace(/<div id=["']root["']><\/div>/i, `<div id="root">${bodyContent}</div>`);
  }

  return html;
}

// Helper to safely write directory and index.html
function writePrerenderedRoute(routePath, htmlContent) {
  const targetDir = path.join(distDir, routePath.replace(/^\//, ''));
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent, 'utf8');
}

// 3. Prerender All 7 Product Pages
for (const [key, product] of Object.entries(productsData)) {
  const canonical = `${baseUrl}${product.url}`;
  const ogImg = product.heroImage ? `${baseUrl}${product.heroImage}` : defaultImage;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${baseUrl}/` },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": `${baseUrl}/products` },
      { "@type": "ListItem", "position": 3, "name": product.h1, "item": canonical }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (product.faq || []).map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": { "@type": "Answer", "text": q.answer }
    }))
  };

  const extraHead = `
    <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
  `;

  // Semantic Product DOM
  let bodyContent = `
    <main class="ssr-product-page" style="font-family: Inter, sans-serif; padding-top: 80px;">
      <section style="background: linear-gradient(to bottom right, #0f172a, #1e1b4b); color: white; padding: 60px 20px; text-align: center;">
        <h1 style="font-size: 2.5rem; font-weight: 800; max-width: 900px; margin: 0 auto 20px;">${product.h1}</h1>
        <p style="font-size: 1.25rem; color: #c7d2fe; max-width: 750px; margin: 0 auto 30px;">${product.heroDescription}</p>
        <a href="/contact?product=${encodeURIComponent(product.id)}" style="display: inline-block; background: #4f46e5; color: white; font-weight: 600; padding: 14px 28px; border-radius: 8px; text-decoration: none;">${product.primaryCta}</a>
      </section>
  `;

  if (product.problemH2) {
    bodyContent += `
      <section style="max-width: 900px; margin: 50px auto; padding: 0 20px;">
        <h2 style="font-size: 1.75rem; font-weight: 700; color: #0f172a; margin-bottom: 16px;">${product.problemH2}</h2>
        <p style="font-size: 1.1rem; line-height: 1.7; color: #334155;">${product.problemText}</p>
      </section>
    `;
  }

  if (product.faq && product.faq.length > 0) {
    bodyContent += `
      <section style="max-width: 900px; margin: 50px auto; padding: 0 20px;">
        <h2 style="font-size: 1.75rem; font-weight: 700; color: #0f172a; margin-bottom: 24px;">Frequently Asked Questions</h2>
        ${product.faq.map(q => `
          <div style="margin-bottom: 20px; padding: 16px; background: #f8fafc; border-radius: 8px;">
            <h3 style="font-size: 1.15rem; font-weight: 600; color: #1e293b; margin: 0 0 8px;">${q.question}</h3>
            <p style="color: #475569; margin: 0; line-height: 1.6;">${q.answer}</p>
          </div>
        `).join('')}
      </section>
    `;
  }

  bodyContent += `</main>`;

  const pageHtml = buildPageHtml({
    title: product.titleTag,
    description: product.metaDescription,
    canonical,
    ogImage: ogImg,
    extraHead,
    bodyContent
  });

  writePrerenderedRoute(product.url, pageHtml);
  console.log(`✓ Prerendered product: ${product.url}`);
}

// 4. Prerender Core Static Pages
const staticPages = [
  {
    path: '/about',
    title: 'About Us | Agentfloww - Enterprise AI Automation',
    description: 'Learn how Agentfloww builds AI automation for enterprise manufacturing, ERP and business workflows.',
    h1: 'About Agentfloww',
    text: 'Agentfloww enables enterprises to build, connect and govern AI agents across ERP, procurement and operations.'
  },
  {
    path: '/products',
    title: 'AI Automation Products for Enterprise Workflows | Agentfloww',
    description: 'Explore Agentfloww AI automation products for SAP, ERP, manufacturing, browser workflows, autonomous agents and intelligent RPA.',
    h1: 'AI Automation Products Built Around Real Business Workflows',
    text: 'Explore our full range of enterprise AI automation software designed for manufacturing and mission-critical workflows.'
  },
  {
    path: '/blogs',
    title: 'Blogs & Insights | Agentfloww',
    description: 'Latest insights, articles and guides on manufacturing AI, ERP automation, and autonomous enterprise workflows.',
    h1: 'Latest Insights & Articles',
    text: 'Explore practical guides, architecture deep-dives and research on autonomous enterprise operations.'
  },
  {
    path: '/contact',
    title: 'Contact Us | Agentfloww',
    description: 'Get in touch with the Agentfloww team for a consultation, demo, or enterprise AI workflow automation inquiry.',
    h1: 'Get in Touch with Agentfloww',
    text: 'Book a discovery session or request a custom architectural review for your enterprise AI workflows.'
  },
  {
    path: '/live-demo',
    title: 'Live Demo | Agentfloww - Enterprise AI Agents in Action',
    description: 'Experience Agentfloww in action with an interactive live demo of our enterprise AI agents.',
    h1: 'Live Interactive Agent Demo',
    text: 'See how Agentfloww automates complex multi-system workflows in real-time.'
  },
  {
    path: '/built-erp-native',
    title: 'Built ERP Native | Agentfloww',
    description: 'Deep native integration with SAP, Oracle, Microsoft Dynamics, NetSuite and Odoo.',
    h1: 'Built ERP-Native for High Compliance Workflows',
    text: 'Zero fragile screen scraping. Directly integrated with enterprise ERP protocols and validation rules.'
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Agentfloww',
    description: 'Our privacy policy details how Agentfloww processes, stores, and protects enterprise and customer data.',
    h1: 'Privacy Policy',
    text: 'Agentfloww is committed to privacy, SOC 2 compliance standards, and responsible enterprise data governance.'
  },
  {
    path: '/refund-policy',
    title: 'Refund Policy | Agentfloww',
    description: 'Agentfloww service agreements and enterprise refund policy.',
    h1: 'Refund Policy',
    text: 'Details regarding our service level agreements, pilot terms, and enterprise satisfaction guarantees.'
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service | Agentfloww',
    description: 'Terms and conditions governing the use of Agentfloww platforms and enterprise AI services.',
    h1: 'Terms of Service',
    text: 'Read the terms of service governing software licensing, API access, and operational guidelines.'
  }
];

for (const sp of staticPages) {
  const canonical = `${baseUrl}${sp.path}`;
  const bodyContent = `
    <main class="ssr-static-page" style="font-family: Inter, sans-serif; max-width: 900px; margin: 80px auto 40px; padding: 0 20px;">
      <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 16px;">${sp.h1}</h1>
      <p style="font-size: 1.15rem; line-height: 1.7; color: #334155;">${sp.text}</p>
    </main>
  `;

  const pageHtml = buildPageHtml({
    title: sp.title,
    description: sp.description,
    canonical,
    ogImage: defaultImage,
    bodyContent
  });

  writePrerenderedRoute(sp.path, pageHtml);
  console.log(`✓ Prerendered static page: ${sp.path}`);
}

// 5. Generate Updated Static sitemap.xml
const today = new Date().toISOString().split('T')[0];
const sitemapUrls = [
  { loc: `${baseUrl}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' },
  ...staticPages.map(sp => ({ loc: `${baseUrl}${sp.path}`, lastmod: today, changefreq: 'monthly', priority: '0.9' })),
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
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
console.log('✓ sitemap.xml updated in public/ and dist/');

// 6. Ensure sitemap.php, index.php, api.php, and .htaccess are copied to dist/
const filesToCopy = ['sitemap.php', 'index.php', '.htaccess', 'api.php'];
for (const file of filesToCopy) {
  const src = path.join(publicDir, file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied ${file} to dist/`);
  }
}

console.log('--- Prerender & SEO Pipeline Completed Successfully! ---');

