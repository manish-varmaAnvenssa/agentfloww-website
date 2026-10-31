const https = require('https');

const TARGET_URL = 'https://agentfloww.com/api/health';
const INTERVAL_MS = 5000; // Check every 5 seconds

console.log(`[MONITOR] Starting Uptime & Status Tracker for: ${TARGET_URL}`);
console.log(`[MONITOR] Logging all checks and highlighting errors/429s...\n`);

function checkStatus() {
  const startTime = Date.now();
  const req = https.get(TARGET_URL, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      const duration = Date.now() - startTime;
      const timestamp = new Date().toLocaleTimeString();
      const edgeId = res.headers['x-hcdn-request-id'] || 'no-hcdn';
      const cfRay = res.headers['cf-ray'] || 'no-cf';
      const cacheStatus = res.headers['cf-cache-status'] || 'N/A';

      if (res.statusCode === 200) {
        console.log(`[${timestamp}] \x1b[32m200 OK\x1b[0m (${duration}ms) | Cache: ${cacheStatus} | Edge: ${edgeId}`);
      } else if (res.statusCode === 429) {
        console.error(`[${timestamp}] \x1b[31m429 TOO MANY REQUESTS\x1b[0m (${duration}ms) | Edge: ${edgeId} | Ray: ${cfRay}`);
      } else {
        console.warn(`[${timestamp}] \x1b[33mHTTP ${res.statusCode}\x1b[0m (${duration}ms) | Body: ${body.slice(0, 100)}`);
      }
    });
  });

  req.on('error', (err) => {
    const timestamp = new Date().toLocaleTimeString();
    console.error(`[${timestamp}] \x1b[31mCONNECTION ERROR:\x1b[0m ${err.message}`);
  });
}

// Initial check and recurring interval
checkStatus();
setInterval(checkStatus, INTERVAL_MS);
