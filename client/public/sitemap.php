<?php
// Dynamic XML Sitemap for Agentfloww
// Automatically queries database for all published blog posts and products
header("Content-Type: application/xml; charset=utf-8");
header("Cache-Control: public, max-age=3600");

// Load Database Config (matches api.php)
$isLocal = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1', 'localhost:8000', 'localhost:5173']);

if ($isLocal) {
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASS', 'Shreyas@123');
    define('DB_NAME', 'agentflow');
} else {
    define('DB_HOST', 'localhost');
    define('DB_USER', 'u430499725_sales');
    define('DB_PASS', 'Anvenssa@123');
    define('DB_NAME', 'u430499725_agentfloww_dbb');
}

$baseUrl = 'https://agentfloww.com';
$today = date('Y-m-d');

// Core Static URLs & All 7 Products
$urls = [
    ['loc' => $baseUrl . '/', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '1.0'],
    ['loc' => $baseUrl . '/about', 'lastmod' => $today, 'changefreq' => 'monthly', 'priority' => '0.9'],
    ['loc' => $baseUrl . '/products', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.9'],
    ['loc' => $baseUrl . '/blogs', 'lastmod' => $today, 'changefreq' => 'daily', 'priority' => '0.9'],
    ['loc' => $baseUrl . '/contact', 'lastmod' => $today, 'changefreq' => 'monthly', 'priority' => '0.9'],
    ['loc' => $baseUrl . '/live-demo', 'lastmod' => $today, 'changefreq' => 'monthly', 'priority' => '0.9'],
    ['loc' => $baseUrl . '/built-erp-native', 'lastmod' => $today, 'changefreq' => 'monthly', 'priority' => '0.8'],
    ['loc' => $baseUrl . '/privacy-policy', 'lastmod' => $today, 'changefreq' => 'yearly', 'priority' => '0.3'],
    ['loc' => $baseUrl . '/refund-policy', 'lastmod' => $today, 'changefreq' => 'yearly', 'priority' => '0.3'],
    ['loc' => $baseUrl . '/terms-of-service', 'lastmod' => $today, 'changefreq' => 'yearly', 'priority' => '0.3'],

    // All 7 Official Product URLs
    ['loc' => $baseUrl . '/products/ai-agent-platform', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.8'],
    ['loc' => $baseUrl . '/products/sap-ai-agent', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.8'],
    ['loc' => $baseUrl . '/products/ai-erp-automation-for-manufacturing', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.8'],
    ['loc' => $baseUrl . '/products/manufacturing-ai-software', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.8'],
    ['loc' => $baseUrl . '/products/browser-ai-agent', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.8'],
    ['loc' => $baseUrl . '/products/autonomous-ai-agents', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.8'],
    ['loc' => $baseUrl . '/products/rpa-ai-agent', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.8'],
];

// Query all published blog posts from MySQL
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_SILENT,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_TIMEOUT => 4
    ]);

    $stmt = $pdo->query("SELECT slug, updated_at, publish_date FROM blogs WHERE status = 'published' ORDER BY updated_at DESC");
    if ($stmt) {
        $blogs = $stmt->fetchAll();
        foreach ($blogs as $blog) {
            if (empty($blog['slug'])) continue;
            $rawDate = !empty($blog['updated_at']) ? $blog['updated_at'] : (!empty($blog['publish_date']) ? $blog['publish_date'] : $today);
            $modDate = substr($rawDate, 0, 10);
            $urls[] = [
                'loc' => $baseUrl . '/blogs/' . htmlspecialchars($blog['slug'], ENT_QUOTES, 'UTF-8'),
                'lastmod' => $modDate,
                'changefreq' => 'weekly',
                'priority' => '0.8'
            ];
        }
    }
} catch (Exception $e) {
    // Graceful fallback to static URLs if DB is temporarily unreachable
}

// Render XML
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($urls as $u) {
    echo "  <url>\n";
    echo "    <loc>" . htmlspecialchars($u['loc'], ENT_XML1, 'UTF-8') . "</loc>\n";
    echo "    <lastmod>" . $u['lastmod'] . "</lastmod>\n";
    echo "    <changefreq>" . $u['changefreq'] . "</changefreq>\n";
    echo "    <priority>" . $u['priority'] . "</priority>\n";
    echo "  </url>\n";
}
echo '</urlset>';

