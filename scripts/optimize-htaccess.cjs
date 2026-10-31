const fs = require('fs');

const remoteIpSnippet = `
# ----------------------------------------------------------------------
# Restore Real Visitor IP behind Cloudflare Proxy
# ----------------------------------------------------------------------
<IfModule mod_remoteip.c>
    RemoteIPHeader CF-Connecting-IP
    RemoteIPHeader X-Forwarded-For
    RemoteIPTrustedProxy 173.245.48.0/20
    RemoteIPTrustedProxy 103.21.244.0/22
    RemoteIPTrustedProxy 103.22.200.0/22
    RemoteIPTrustedProxy 103.31.4.0/22
    RemoteIPTrustedProxy 141.101.64.0/18
    RemoteIPTrustedProxy 108.162.192.0/18
    RemoteIPTrustedProxy 190.93.240.0/20
    RemoteIPTrustedProxy 188.114.96.0/20
    RemoteIPTrustedProxy 197.234.240.0/22
    RemoteIPTrustedProxy 198.41.128.0/17
    RemoteIPTrustedProxy 162.158.0.0/15
    RemoteIPTrustedProxy 104.16.0.0/13
    RemoteIPTrustedProxy 104.24.0.0/14
    RemoteIPTrustedProxy 172.64.0.0/13
    RemoteIPTrustedProxy 131.0.72.0/22
</IfModule>
`;

const oldCacheBlock = `    # Prevent aggressive caching of index.html & index.php
    <FilesMatch "(index\\.html|index\\.php)$">
        Header set Cache-Control "no-cache, no-store, must-revalidate"
        Header set Pragma "no-cache"
        Header set Expires 0
    </FilesMatch>`;

const newCacheBlock = `    # Allow CDN Edge caching for 60 seconds while requiring browser validation
    <FilesMatch "(index\\.html|index\\.php)$">
        Header set Cache-Control "public, max-age=0, must-revalidate, s-maxage=60"
    </FilesMatch>`;

for (const p of ['client/public/.htaccess', 'client/.htaccess', 'client/dist/.htaccess']) {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    const norm = content.replace(/\r\n/g, '\n');
    const oldNorm = oldCacheBlock.replace(/\r\n/g, '\n');
    const newNorm = newCacheBlock.replace(/\r\n/g, '\n');
    
    let updated = norm;
    if (updated.includes(oldNorm)) {
      updated = updated.replace(oldNorm, newNorm);
    }
    
    if (!updated.includes('mod_remoteip.c')) {
      updated = remoteIpSnippet.trim() + '\n\n' + updated;
    }
    
    fs.writeFileSync(p, updated, 'utf8');
    console.log('Optimized cache and remote IP in:', p);
  }
}
