<?php
// ======================================================================
// Dynamic SSR Meta & Content Injector for Agentfloww
// Provides instant SEO, unique canonical tags, and OpenGraph preview
// for Googlebot, Bingbot, LinkedIn, Twitter/X, and social scrapers
// ======================================================================

// Ensure error reporting doesn't break HTML output
ini_set('display_errors', 0);
error_reporting(0);

$htmlFile = __DIR__ . '/index.html';
if (!file_exists($htmlFile)) {
    http_response_code(500);
    echo "Website build in progress. Please refresh in a moment.";
    exit;
}

$html = file_get_contents($htmlFile);

// Parse Requested URI
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$uriPath = parse_url($requestUri, PHP_URL_PATH);
$uriPath = '/' . trim($uriPath, '/');
if ($uriPath === '//') $uriPath = '/';

// Immediate 301 Permanent Redirect for Duplicate HR Blog Post
if ($uriPath === '/blogs/ai-agents-for-hr-automation-employee-support') {
    header("Location: https://agentfloww.com/blogs/ai-agents-for-internal-hr-automation-employee-support", true, 301);
    exit;
}

$baseUrl = 'https://agentfloww.com';
$canonicalUrl = $baseUrl . ($uriPath === '/' ? '/' : $uriPath);
$pageTitle = 'Agentfloww | AI-Powered Manufacturing Automation';
$pageDesc = 'Agentfloww: AI-powered automation for Manufacturing. Smarter procurement, faster ERP, and zero busywork with major ERP systems (SAP, Oracle, Dynamics, NetSuite, Odoo), and AI agents.';
$ogImage = $baseUrl . '/images/logo/Agentflow%20only%20svg.svg';
$ogType = 'website';
$bodyInjection = '';
$extraHead = '';

// Database Configuration
$isLocal = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1', 'localhost:8000', 'localhost:5173']);
if ($isLocal) {
    $dbHost = 'localhost';
    $dbUser = 'root';
    $dbPass = 'Shreyas@123';
    $dbName = 'agentflow';
} else {
    $dbHost = 'localhost';
    $dbUser = 'u430499725_sales';
    $dbPass = 'Anvenssa@123';
    $dbName = 'u430499725_agentfloww_dbb';
}

try {
    // ------------------------------------------------------------------
    // 1. ROUTE: /blogs/{slug}
    // ------------------------------------------------------------------
    if (strpos($uriPath, '/blogs/') === 0 && strlen($uriPath) > 7) {
        $slug = substr($uriPath, 7);
        $slug = trim($slug, '/');

        if (!empty($slug)) {
            $dsn = "mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4";
            $pdo = new PDO($dsn, $dbUser, $dbPass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_SILENT,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_TIMEOUT => 2
            ]);

            $stmt = $pdo->prepare("SELECT title, excerpt, content, featured_image, seo_title, seo_description, seo_keywords, canonical_url, og_image, publish_date, updated_at FROM blogs WHERE slug = ? AND status = 'published' LIMIT 1");
            $stmt->execute([$slug]);
            $blog = $stmt->fetch();

            if ($blog) {
                $rawTitle = !empty($blog['seo_title']) ? $blog['seo_title'] : $blog['title'];
                $pageTitle = $rawTitle . ' | AgentFlow Blog';
                
                $rawDesc = !empty($blog['seo_description']) ? $blog['seo_description'] : (!empty($blog['excerpt']) ? $blog['excerpt'] : strip_tags(substr($blog['content'] ?? '', 0, 160)));
                $pageDesc = trim(preg_replace('/\s+/', ' ', $rawDesc));
                
                $canonicalUrl = !empty($blog['canonical_url']) ? $blog['canonical_url'] : ($baseUrl . '/blogs/' . $slug);
                $ogType = 'article';

                $rawImg = !empty($blog['og_image']) ? $blog['og_image'] : (!empty($blog['featured_image']) ? $blog['featured_image'] : '');
                if (!empty($rawImg)) {
                    $ogImage = (strpos($rawImg, 'http') === 0) ? $rawImg : ($baseUrl . '/' . ltrim($rawImg, '/'));
                }

                // Article Schema for Google
                $articleSchema = [
                    '@context' => 'https://schema.org',
                    '@type' => 'BlogPosting',
                    'headline' => $rawTitle,
                    'description' => $pageDesc,
                    'image' => [$ogImage],
                    'datePublished' => $blog['publish_date'] ?? date('c'),
                    'dateModified' => $blog['updated_at'] ?? ($blog['publish_date'] ?? date('c')),
                    'author' => [
                        '@type' => 'Organization',
                        'name' => 'Agentfloww'
                    ],
                    'publisher' => [
                        '@type' => 'Organization',
                        'name' => 'Agentfloww',
                        'logo' => [
                            '@type' => 'ImageObject',
                            'url' => $baseUrl . '/images/logo/Agentflow%20only%20svg.svg'
                        ]
                    ],
                    'mainEntityOfPage' => [
                        '@type' => 'WebPage',
                        '@id' => $canonicalUrl
                    ]
                ];
                $extraHead .= '<script type="application/ld+json">' . json_encode($articleSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";

                // Pre-render semantic article content inside #root for search engine crawlers
                // When React mounts on the client, createRoot() replaces this cleanly
                $cleanContent = $blog['content'] ?? '';
                $bodyInjection = '<article style="max-width:800px;margin:0 auto;padding:24px;font-family:sans-serif;">'
                    . '<h1>' . htmlspecialchars($blog['title'] ?? '', ENT_QUOTES, 'UTF-8') . '</h1>'
                    . (!empty($blog['excerpt']) ? '<p><strong>' . htmlspecialchars($blog['excerpt'], ENT_QUOTES, 'UTF-8') . '</strong></p>' : '')
                    . '<div>' . $cleanContent . '</div>'
                    . '</article>';
            }
        }
    }

    // ------------------------------------------------------------------
    // 2. ROUTE: /products/{slug}
    // ------------------------------------------------------------------
    elseif (strpos($uriPath, '/products/') === 0 && strlen($uriPath) > 10) {
        $prodSlug = substr($uriPath, 10);
        $prodSlug = trim($prodSlug, '/');

        $productsJsonFile = __DIR__ . '/products.json';
        if (file_exists($productsJsonFile)) {
            $productsData = json_decode(file_get_contents($productsJsonFile), true);
            if (isset($productsData[$prodSlug])) {
                $p = $productsData[$prodSlug];
                $pageTitle = !empty($p['titleTag']) ? $p['titleTag'] : ($p['h1'] . ' | Agentfloww');
                $pageDesc = !empty($p['metaDescription']) ? $p['metaDescription'] : ($p['heroDescription'] ?? $pageDesc);
                $canonicalUrl = $baseUrl . ($p['url'] ?? ('/products/' . $prodSlug));
                
                if (!empty($p['heroImage'])) {
                    $ogImage = (strpos($p['heroImage'], 'http') === 0) ? $p['heroImage'] : ($baseUrl . '/' . ltrim($p['heroImage'], '/'));
                }

                $bodyInjection = '<div style="max-width:900px;margin:0 auto;padding:24px;font-family:sans-serif;">'
                    . '<h1>' . htmlspecialchars($p['h1'] ?? '', ENT_QUOTES, 'UTF-8') . '</h1>'
                    . '<p>' . htmlspecialchars($p['heroDescription'] ?? '', ENT_QUOTES, 'UTF-8') . '</p>'
                    . (!empty($p['problemH2']) ? '<h2>' . htmlspecialchars($p['problemH2'], ENT_QUOTES, 'UTF-8') . '</h2>' : '')
                    . (!empty($p['problemText']) ? '<p>' . htmlspecialchars($p['problemText'], ENT_QUOTES, 'UTF-8') . '</p>' : '')
                    . '</div>';
            }
        }
    }

    // ------------------------------------------------------------------
    // 3. STATIC ROUTES (/about, /contact, /blogs, /products, etc.)
    // ------------------------------------------------------------------
    elseif ($uriPath === '/about') {
        $pageTitle = 'About Us | Agentfloww';
        $pageDesc = 'Learn about Agentfloww: enterprise AI agent platform for automating ERP, procurement, and manufacturing workflows.';
    } elseif ($uriPath === '/blogs') {
        $pageTitle = 'Agentfloww Blog | Insights on AI Agents & Manufacturing Automation';
        $pageDesc = 'Explore the latest articles, guides, and real-world use cases on enterprise AI agents, SAP automation, and autonomous workflows.';
    } elseif ($uriPath === '/products') {
        $pageTitle = 'Enterprise AI Agent Products | Agentfloww';
        $pageDesc = 'Explore Agentfloww products: AI Agent Platform, SAP AI Agent, ERP Automation, Browser AI Agent, and Autonomous Agents.';
    } elseif ($uriPath === '/contact') {
        $pageTitle = 'Contact Us | Agentfloww';
        $pageDesc = 'Get in touch with the Agentfloww team for enterprise inquiries, demos, and partnership opportunities.';
    } elseif ($uriPath === '/live-demo') {
        $pageTitle = 'Schedule a Live Demo | Agentfloww';
        $pageDesc = 'Book a 1-on-1 personalized discovery session to see Agentfloww AI agents automate workflows in real time.';
    } elseif ($uriPath === '/built-erp-native') {
        $pageTitle = 'Built ERP-Native | Agentfloww';
        $pageDesc = 'Discover how Agentfloww is engineered ERP-native for seamless integration with SAP, Oracle, Microsoft Dynamics, and NetSuite.';
    }
} catch (Throwable $e) {
    // Graceful fallback: If any exception occurs, default variables remain safe
}

// ----------------------------------------------------------------------
// HTML Meta Tag Replacements
// ----------------------------------------------------------------------

// 1. Replace <title>
$safeTitle = htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8');
$html = preg_replace('/<title>.*?<\/title>/is', '<title>' . $safeTitle . '</title>', $html, 1);

// 2. Replace <meta name="description">
$safeDesc = htmlspecialchars($pageDesc, ENT_QUOTES, 'UTF-8');
$html = preg_replace('/<meta\s+name=["\']description["\']\s+content=["\'].*?["\']\s*\/?>/is', '<meta name="description" content="' . $safeDesc . '" />', $html, 1);

// 3. Inject Canonical, OpenGraph, and Twitter tags into <head>
$safeCanonical = htmlspecialchars($canonicalUrl, ENT_QUOTES, 'UTF-8');
$safeOgImage = htmlspecialchars($ogImage, ENT_QUOTES, 'UTF-8');

$metaTags = "\n    <!-- Dynamic Server-Side Meta & SEO Injected -->\n"
    . '    <link rel="canonical" href="' . $safeCanonical . '" />' . "\n"
    . '    <meta property="og:type" content="' . $ogType . '" />' . "\n"
    . '    <meta property="og:title" content="' . $safeTitle . '" />' . "\n"
    . '    <meta property="og:description" content="' . $safeDesc . '" />' . "\n"
    . '    <meta property="og:image" content="' . $safeOgImage . '" />' . "\n"
    . '    <meta property="og:url" content="' . $safeCanonical . '" />' . "\n"
    . '    <meta property="og:site_name" content="Agentfloww" />' . "\n"
    . '    <meta name="twitter:card" content="summary_large_image" />' . "\n"
    . '    <meta name="twitter:title" content="' . $safeTitle . '" />' . "\n"
    . '    <meta name="twitter:description" content="' . $safeDesc . '" />' . "\n"
    . '    <meta name="twitter:image" content="' . $safeOgImage . '" />' . "\n"
    . (!empty($extraHead) ? ('    ' . trim($extraHead) . "\n") : '');

// Insert right before </head>
$html = str_replace('</head>', $metaTags . '  </head>', $html);

// 4. Inject semantic body content inside <div id="root"> for web crawlers
if (!empty($bodyInjection)) {
    $html = str_replace('<div id="root"></div>', '<div id="root">' . $bodyInjection . '</div>', $html);
}

// Set proper Cache-Control and Content-Type headers
header("Content-Type: text/html; charset=UTF-8");
header("Cache-Control: public, max-age=0, must-revalidate, s-maxage=60");

echo $html;
