const fs = require('fs');

const oldBlock = `# ----------------------------------------------------------------------
# 1. Dynamic Sitemap Routing
# ----------------------------------------------------------------------
RewriteRule ^sitemap\\.xml$ sitemap.php [L]

# ----------------------------------------------------------------------
# 2. Existing Static Files & Media Assets
# ----------------------------------------------------------------------
RewriteRule ^images/ - [L]
RewriteRule ^uploads/ - [L]
RewriteRule \\.(css|js|png|jpg|jpeg|svg|webp|ico|woff|woff2|gif|mp4|pdf|txt|xml|json)$ - [L]

# Serve existing physical files directly
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^ - [L]

# ----------------------------------------------------------------------
# 3. Route all API requests to api.php
# ----------------------------------------------------------------------
RewriteRule ^/?api/(.*)$ api.php?route=$1 [QSA,L]

# ----------------------------------------------------------------------
# 4. Fallback all remaining routes to index.html (React SPA Routing)
# ----------------------------------------------------------------------
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^.*$ /index.html [L]`;

const newBlock = `# ----------------------------------------------------------------------
# 1. Dynamic Sitemap Routing
# ----------------------------------------------------------------------
RewriteRule ^sitemap\\.xml$ sitemap.php [L]

# ----------------------------------------------------------------------
# 2. Route all API requests to api.php
# ----------------------------------------------------------------------
RewriteRule ^/?api/(.*)$ api.php?route=$1 [QSA,L]

# ----------------------------------------------------------------------
# 3. Static Media & Assets (Direct physical file access)
# ----------------------------------------------------------------------
RewriteRule ^uploads/ - [L]
RewriteRule ^images/ - [L]
RewriteRule \\.(css|js|png|jpg|jpeg|svg|webp|ico|woff|woff2|gif|mp4|pdf|txt|xml|json)$ - [L]

# Route any subfolder index.html to root /index.html (ignores stale pre-rendered subfolders)
RewriteRule ^.+/index\\.html$ /index.html [L]

# ----------------------------------------------------------------------
# 4. Fallback all remaining routes to root index.html (React SPA Routing)
# ----------------------------------------------------------------------
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_URI} !^/(uploads|images)/ [NC]
RewriteCond %{REQUEST_FILENAME} !-f [OR]
RewriteCond %{REQUEST_URI} \\.html$ [NC]
RewriteRule ^.*$ /index.html [L]`;

for (const p of ['client/public/.htaccess', 'client/.htaccess', 'client/dist/.htaccess']) {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    const normalized = content.replace(/\r\n/g, '\n');
    const targetNorm = oldBlock.replace(/\r\n/g, '\n');
    const replacementNorm = newBlock.replace(/\r\n/g, '\n');
    if (normalized.includes(targetNorm)) {
      content = normalized.replace(targetNorm, replacementNorm);
      fs.writeFileSync(p, content, 'utf8');
      console.log('Updated:', p);
    } else {
      console.log('Not matched in:', p);
    }
  }
}
