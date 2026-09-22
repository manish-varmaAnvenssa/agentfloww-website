<?php
// Database Configuration (matches api.php)
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

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    echo "<h3>Connected to Database Successfully!</h3>";
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// 1. Import Contacts
$contactsFile = __DIR__ . '/contacts.json';
if (file_exists($contactsFile)) {
    $contactsData = json_decode(file_get_contents($contactsFile), true);
    if (is_array($contactsData)) {
        $stmt = $pdo->prepare("
            INSERT INTO contacts (name, email, phone, company, message, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE name=VALUES(name)
        ");
        $count = 0;
        foreach ($contactsData as $c) {
            $name = $c['name'] ?? '';
            $email = $c['email'] ?? '';
            $phone = $c['phone'] ?? '';
            $company = $c['company'] ?? '';
            $message = $c['message'] ?? $c['subject'] ?? '';
            $status = $c['status'] ?? 'new';
            $createdAt = $c['created_at'] ?? date('Y-m-d H:i:s');

            $stmt->execute([$name, $email, $phone, $company, $message, $status, $createdAt]);
            $count++;
        }
        echo "<p style='color: green;'>✅ Successfully imported $count contacts.</p>";
    } else {
        echo "<p style='color: red;'>❌ Failed to decode contacts.json. Invalid JSON format.</p>";
    }
} else {
    echo "<p style='color: orange;'>⚠️ contacts.json not found in public_html.</p>";
}

// 2. Import Demos
$demosFile = __DIR__ . '/demos.json';
if (file_exists($demosFile)) {
    $demosData = json_decode(file_get_contents($demosFile), true);
    if (is_array($demosData)) {
        $stmt = $pdo->prepare("
            INSERT INTO demos (name, email, company, phone, industry, use_case, preferred_date, preferred_time, status, notes, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE name=VALUES(name)
        ");
        $count = 0;
        foreach ($demosData as $d) {
            $name = $d['name'] ?? '';
            $email = $d['email'] ?? '';
            $company = $d['company'] ?? '';
            $phone = $d['phone'] ?? '';
            $industry = $d['industry'] ?? '';
            $useCase = $d['use_case'] ?? $d['message'] ?? '';
            $preferredDate = $d['preferred_date'] ?? null;
            $preferredTime = $d['preferred_time'] ?? '';
            $status = $d['status'] ?? 'pending';
            $notes = $d['notes'] ?? '';
            $createdAt = $d['created_at'] ?? date('Y-m-d H:i:s');

            $stmt->execute([$name, $email, $company, $phone, $industry, $useCase, $preferredDate, $preferredTime, $status, $notes, $createdAt]);
            $count++;
        }
        echo "<p style='color: green;'>✅ Successfully imported $count demo requests.</p>";
    } else {
        echo "<p style='color: red;'>❌ Failed to decode demos.json. Invalid JSON format.</p>";
    }
} else {
    echo "<p style='color: orange;'>⚠️ demos.json not found in public_html.</p>";
}

echo "<br><p style='color: red; font-weight: bold;'>⚠️ IMPORTANT: Please delete import-json.php from public_html immediately for security purposes!</p>";
?>