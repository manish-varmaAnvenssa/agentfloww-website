<?php
header("Content-Type: text/plain");

echo "🧪 Running Local API Mock Tests...\n\n";

function runTest($route, $uri) {
    $_SERVER['REQUEST_METHOD'] = 'GET';
    $_SERVER['REQUEST_URI'] = $uri;
    $_GET['route'] = $route;
    
    ob_start();
    try {
        include 'api.php';
    } catch (Exception $e) {
        echo "❌ Exception on $route: " . $e->getMessage() . "\n";
    }
    $output = ob_get_clean();
    
    echo "Current status code: " . http_response_code() . "\n";
    echo "📌 Route: $route\n";
    echo "----------------------------------------\n";
    echo $output . "\n";
    echo "----------------------------------------\n\n";
}

// Run ONLY blogs test to prevent the script from exiting on categories
runTest('blogs', '/api/blogs');
