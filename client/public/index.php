<?php
/**
 * Agentfloww Dynamic SEO & Prerendering Engine
 * Serves fully rendered HTML with complete meta tags, OpenGraph, JSON-LD schema,
 * and semantic content for Googlebot, social crawlers, and users.
 */

$requestUri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$requestUri = trim($requestUri, '/');
$parts = explode('/', $requestUri);

$htmlFile = __DIR__ . '/index.html';
if (!file_exists($htmlFile)) {
    http_response_code(500);
    echo "Site build not found. Please run npm run build.";
    exit;
}

$html = file_get_contents($htmlFile);

// Helper function to replace title and meta tags
function injectSEO(&$html, $title, $description, $canonical, $ogImage, $type = 'website', $extraHead = '', $bodyContent = '') {
    // 1. Replace Title
    $encodedTitle = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');
    if (preg_match('/<title>.*?<\/title>/i', $html)) {
        $html = preg_replace('/<title>.*?<\/title>/i', '<title>' . $encodedTitle . '</title>', $html, 1);
    } else {
        $extraHead .= "\n    <title>" . $encodedTitle . "</title>";
    }

    // 2. Replace or inject Meta Description
    $encodedDesc = htmlspecialchars($description, ENT_QUOTES, 'UTF-8');
    if (preg_match('/<meta\s+name=["\']description["\'][^>]*>/i', $html)) {
        $html = preg_replace('/<meta\s+name=["\']description["\'][^>]*>/i', '<meta name="description" content="' . $encodedDesc . '" />', $html, 1);
    } else {
        $extraHead .= "\n    <meta name=\"description\" content=\"" . $encodedDesc . "\" />";
    }

    // 3. Prepare OpenGraph & Canonical tags
    $headTags = "\n    <!-- Dynamic SEO & Crawler Meta Tags -->";
    $headTags .= "\n    <link rel=\"canonical\" href=\"" . htmlspecialchars($canonical, ENT_QUOTES, 'UTF-8') . "\" />";
    $headTags .= "\n    <meta property=\"og:title\" content=\"" . $encodedTitle . "\" />";
    $headTags .= "\n    <meta property=\"og:description\" content=\"" . $encodedDesc . "\" />";
    $headTags .= "\n    <meta property=\"og:url\" content=\"" . htmlspecialchars($canonical, ENT_QUOTES, 'UTF-8') . "\" />";
    $headTags .= "\n    <meta property=\"og:type\" content=\"" . htmlspecialchars($type, ENT_QUOTES, 'UTF-8') . "\" />";
    $headTags .= "\n    <meta property=\"og:image\" content=\"" . htmlspecialchars($ogImage, ENT_QUOTES, 'UTF-8') . "\" />";
    $headTags .= "\n    <meta name=\"twitter:card\" content=\"summary_large_image\" />";
    $headTags .= "\n    <meta name=\"twitter:title\" content=\"" . $encodedTitle . "\" />";
    $headTags .= "\n    <meta name=\"twitter:description\" content=\"" . $encodedDesc . "\" />";
    $headTags .= "\n    <meta name=\"twitter:image\" content=\"" . htmlspecialchars($ogImage, ENT_QUOTES, 'UTF-8') . "\" />";

    if (!empty($extraHead)) {
        $headTags .= "\n" . $extraHead;
    }

    $html = str_replace('</head>', $headTags . "\n  </head>", $html);

    // 4. Inject semantic body content inside <div id="root"> for zero-blank-page crawlers
    if (!empty($bodyContent)) {
        $html = preg_replace(
            '/<div id=["\']root["\']><\/div>/i',
            '<div id="root">' . $bodyContent . '</div>',
            $html,
            1
        );
    }
}

// Database Connection
function getDbConnection() {
    $isLocal = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1', 'localhost:8000', 'localhost:5173']);
    if ($isLocal) {
        $host = 'localhost';
        $user = 'root';
        $pass = 'Shreyas@123';
        $dbname = 'agentflow';
    } else {
        $host = 'localhost';
        $user = 'u430499725_sales';
        $pass = 'Anvenssa@123';
        $dbname = 'u430499725_agentfloww_dbb';
    }

    try {
        return new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_SILENT,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_TIMEOUT => 3
        ]);
    } catch (Exception $e) {
        return null;
    }
}

$baseUrl = 'https://agentfloww.com';
$defaultImage = $baseUrl . '/images/logo/Agentflow only svg.svg';

// CASE 1: Blog Post (/blogs/:slug)
if (count($parts) >= 2 && $parts[0] === 'blogs' && !empty($parts[1])) {
    $slug = $parts[1];
    $pdo = getDbConnection();

    if ($pdo) {
        $stmt = $pdo->prepare("SELECT * FROM blogs WHERE slug = ? AND status = 'published' LIMIT 1");
        $stmt->execute([$slug]);
        $blog = $stmt->fetch();

        if ($blog) {
            $title = !empty($blog['seo_title']) ? $blog['seo_title'] : ($blog['title'] . ' | Agentfloww');
            $desc = !empty($blog['seo_description']) 
                ? $blog['seo_description'] 
                : (!empty($blog['excerpt']) ? $blog['excerpt'] : substr(strip_tags($blog['content']), 0, 160));
            $canonical = !empty($blog['canonical_url']) ? $blog['canonical_url'] : ($baseUrl . '/blogs/' . $slug);
            $ogImage = !empty($blog['og_image']) ? $blog['og_image'] : (!empty($blog['featured_image']) ? $blog['featured_image'] : $defaultImage);
            if (strpos($ogImage, 'http') !== 0) {
                $ogImage = $baseUrl . '/' . ltrim($ogImage, '/');
            }

            // Article JSON-LD Schema
            $jsonLd = [
                "@context" => "https://schema.org",
                "@type" => "BlogPosting",
                "headline" => $blog['title'],
                "description" => $desc,
                "image" => $ogImage,
                "author" => [
                    "@type" => "Person",
                    "name" => !empty($blog['author_name']) ? $blog['author_name'] : "Agentfloww Team"
                ],
                "publisher" => [
                    "@type" => "Organization",
                    "name" => "Agentfloww",
                    "logo" => [
                        "@type" => "ImageObject",
                        "url" => $defaultImage
                    ]
                ],
                "datePublished" => !empty($blog['publish_date']) ? $blog['publish_date'] : $blog['created_at'],
                "dateModified" => !empty($blog['updated_at']) ? $blog['updated_at'] : $blog['publish_date'],
                "mainEntityOfPage" => [
                    "@type" => "WebPage",
                    "@id" => $canonical
                ]
            ];
            $extraHead = '<script type="application/ld+json">' . json_encode($jsonLd, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>';

            // Prerendered Semantic Blog Body for Googlebot and instant view
            $body = '<main class="ssr-blog-article" style="max-width: 900px; margin: 80px auto 40px; padding: 0 20px; font-family: Inter, sans-serif;">';
            $body .= '<nav aria-label="Breadcrumb" style="font-size: 14px; margin-bottom: 20px; color: #64748b;">';
            $body .= '<a href="/" style="color: #6366f1; text-decoration: none;">Home</a> &gt; ';
            $body .= '<a href="/blogs" style="color: #6366f1; text-decoration: none;">Blogs</a> &gt; ';
            $body .= '<span>' . htmlspecialchars($blog['title'], ENT_QUOTES, 'UTF-8') . '</span>';
            $body .= '</nav>';
            $body .= '<header style="margin-bottom: 30px;">';
            $body .= '<h1 style="font-size: 2.25rem; font-weight: 800; line-height: 1.25; color: #0f172a; margin-bottom: 16px;">' . htmlspecialchars($blog['title'], ENT_QUOTES, 'UTF-8') . '</h1>';
            $body .= '<div style="font-size: 14px; color: #64748b; display: flex; gap: 16px; align-items: center;">';
            $body .= '<span>By ' . htmlspecialchars($blog['author_name'] ?: 'Agentfloww Team', ENT_QUOTES, 'UTF-8') . '</span>';
            $body .= '<span>•</span>';
            $pubDate = !empty($blog['publish_date']) ? date('F j, Y', strtotime($blog['publish_date'])) : '';
            $body .= '<time>' . $pubDate . '</time>';
            $body .= '<span>•</span>';
            $body .= '<span>' . (int)($blog['read_time'] ?: 5) . ' min read</span>';
            $body .= '</div>';
            $body .= '</header>';

            if (!empty($blog['featured_image'])) {
                $featImg = htmlspecialchars($blog['featured_image'], ENT_QUOTES, 'UTF-8');
                $body .= '<div style="margin-bottom: 32px; border-radius: 12px; overflow: hidden;">';
                $body .= '<img src="' . $featImg . '" alt="' . htmlspecialchars($blog['title'], ENT_QUOTES, 'UTF-8') . '" style="width: 100%; height: auto; max-height: 500px; object-fit: cover;" />';
                $body .= '</div>';
            }

            if (!empty($blog['key_takeaways'])) {
                $body .= '<div style="background: #f8fafc; border-left: 4px solid #6366f1; padding: 20px; border-radius: 8px; margin-bottom: 32px;">';
                $body .= '<h2 style="font-size: 1.25rem; font-weight: 700; color: #1e293b; margin-top: 0; margin-bottom: 12px;">Key Takeaways</h2>';
                $body .= '<div style="color: #334155; line-height: 1.7;">' . nl2br(htmlspecialchars($blog['key_takeaways'], ENT_QUOTES, 'UTF-8')) . '</div>';
                $body .= '</div>';
            }

            $body .= '<article class="article-content" style="font-size: 1.125rem; line-height: 1.8; color: #334155;">';
            $body .= $blog['content'];
            $body .= '</article>';
            $body .= '</main>';

            injectSEO($html, $title, $desc, $canonical, $ogImage, 'article', $extraHead, $body);
            echo $html;
            exit;
        }
    }
}

// CASE 2: Products Page (/products/:productId)
$productsFile = __DIR__ . '/products.json';
if (file_exists($productsFile)) {
    $productsData = json_decode(file_get_contents($productsFile), true);
    if (count($parts) >= 2 && $parts[0] === 'products' && isset($productsData[$parts[1]])) {
        $product = $productsData[$parts[1]];
        $title = $product['titleTag'];
        $desc = $product['metaDescription'];
        $canonical = $baseUrl . $product['url'];
        $ogImage = !empty($product['heroImage']) ? ($baseUrl . $product['heroImage']) : $defaultImage;

        // Structured Schema for Product & FAQ
        $faqEntities = [];
        if (!empty($product['faq']) && is_array($product['faq'])) {
            foreach ($product['faq'] as $q) {
                $faqEntities[] = [
                    "@type" => "Question",
                    "name" => $q['question'],
                    "acceptedAnswer" => [
                        "@type" => "Answer",
                        "text" => $q['answer']
                    ]
                ];
            }
        }

        $schemas = [
            [
                "@context" => "https://schema.org",
                "@type" => "BreadcrumbList",
                "itemListElement" => [
                    ["@type" => "ListItem", "position" => 1, "name" => "Home", "item" => $baseUrl . "/"],
                    ["@type" => "ListItem", "position" => 2, "name" => "Products", "item" => $baseUrl . "/products"],
                    ["@type" => "ListItem", "position" => 3, "name" => $product['h1'], "item" => $canonical]
                ]
            ]
        ];

        if (!empty($faqEntities)) {
            $schemas[] = [
                "@context" => "https://schema.org",
                "@type" => "FAQPage",
                "mainEntity" => $faqEntities
            ];
        }

        $extraHead = '<script type="application/ld+json">' . json_encode($schemas, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>';

        // Semantic Prerendered Product DOM
        $body = '<main class="ssr-product-page" style="font-family: Inter, sans-serif; padding-top: 80px;">';
        $body .= '<div style="background: linear-gradient(to bottom right, #0f172a, #1e1b4b); color: white; padding: 60px 20px; text-align: center;">';
        $body .= '<h1 style="font-size: 2.5rem; font-weight: 800; max-width: 900px; margin: 0 auto 20px;">' . htmlspecialchars($product['h1'], ENT_QUOTES, 'UTF-8') . '</h1>';
        $body .= '<p style="font-size: 1.25rem; color: #c7d2fe; max-width: 750px; margin: 0 auto 30px;">' . htmlspecialchars($product['heroDescription'], ENT_QUOTES, 'UTF-8') . '</p>';
        $body .= '<a href="/contact?product=' . urlencode($product['id']) . '" style="display: inline-block; background: #4f46e5; color: white; font-weight: 600; padding: 14px 28px; border-radius: 8px; text-decoration: none;">' . htmlspecialchars($product['primaryCta'], ENT_QUOTES, 'UTF-8') . '</a>';
        $body .= '</div>';

        if (!empty($product['problemH2'])) {
            $body .= '<section style="max-width: 900px; margin: 50px auto; padding: 0 20px;">';
            $body .= '<h2 style="font-size: 1.75rem; font-weight: 700; color: #0f172a; margin-bottom: 16px;">' . htmlspecialchars($product['problemH2'], ENT_QUOTES, 'UTF-8') . '</h2>';
            $body .= '<p style="font-size: 1.1rem; line-height: 1.7; color: #334155;">' . htmlspecialchars($product['problemText'], ENT_QUOTES, 'UTF-8') . '</p>';
            $body .= '</section>';
        }

        if (!empty($product['faq'])) {
            $body .= '<section style="max-width: 900px; margin: 50px auto; padding: 0 20px;">';
            $body .= '<h2 style="font-size: 1.75rem; font-weight: 700; color: #0f172a; margin-bottom: 24px;">Frequently Asked Questions</h2>';
            foreach ($product['faq'] as $q) {
                $body .= '<div style="margin-bottom: 20px; padding: 16px; background: #f8fafc; border-radius: 8px;">';
                $body .= '<h3 style="font-size: 1.15rem; font-weight: 600; color: #1e293b; margin: 0 0 8px;">' . htmlspecialchars($q['question'], ENT_QUOTES, 'UTF-8') . '</h3>';
                $body .= '<p style="color: #475569; margin: 0; line-height: 1.6;">' . htmlspecialchars($q['answer'], ENT_QUOTES, 'UTF-8') . '</p>';
                $body .= '</div>';
            }
            $body .= '</section>';
        }

        $body .= '</main>';

        injectSEO($html, $title, $desc, $canonical, $ogImage, 'website', $extraHead, $body);
        echo $html;
        exit;
    }
}

// CASE 3: Core Static Pages
$staticSeo = [
    'about' => [
        'title' => 'About Us | Agentfloww - Enterprise AI Automation',
        'desc' => 'Learn how Agentfloww builds AI automation for enterprise manufacturing, ERP and business workflows.'
    ],
    'products' => [
        'title' => 'AI Automation Products for Enterprise Workflows | Agentfloww',
        'desc' => 'Explore Agentfloww AI automation products for SAP, ERP, manufacturing, browser workflows, autonomous agents and intelligent RPA.'
    ],
    'blogs' => [
        'title' => 'Blogs & Insights | Agentfloww',
        'desc' => 'Latest insights, articles and guides on manufacturing AI, ERP automation, and autonomous enterprise workflows.'
    ],
    'contact' => [
        'title' => 'Contact Us | Agentfloww',
        'desc' => 'Get in touch with the Agentfloww team for a consultation, demo, or enterprise AI workflow automation inquiry.'
    ],
    'live-demo' => [
        'title' => 'Live Demo | Agentfloww - Enterprise AI Agents in Action',
        'desc' => 'Experience Agentfloww in action with an interactive live demo of our enterprise AI agents.'
    ],
    'built-erp-native' => [
        'title' => 'Built ERP Native | Agentfloww',
        'desc' => 'Deep native integration with SAP, Oracle, Microsoft Dynamics, NetSuite and Odoo.'
    ]
];

$pageKey = $parts[0] ?? '';
if (isset($staticSeo[$pageKey])) {
    $info = $staticSeo[$pageKey];
    injectSEO($html, $info['title'], $info['desc'], $baseUrl . '/' . $pageKey, $defaultImage);
    echo $html;
    exit;
}

// Default fallback: return standard index.html
echo $html;

