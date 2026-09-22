<?php
// CORS & Headers Setup
ob_start();
ini_set('display_errors', 0);
error_reporting(E_ALL);

$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Global Exception Handler
set_exception_handler(function($e) {
    sendError('Server error: ' . $e->getMessage(), 500);
});

// Load Database Config
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

// Database Connection
function ensureTablesExist($pdo) {
    try {
        $pdo->query("SELECT 1 FROM email_otps LIMIT 1");
    } catch (PDOException $e) {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS email_otps (
              id INT AUTO_INCREMENT PRIMARY KEY,
              email VARCHAR(100) NOT NULL,
              otp VARCHAR(10) NOT NULL,
              expires_at TIMESTAMP NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ");
    }

    try {
        $pdo->query("SELECT 1 FROM users LIMIT 1");
    } catch (PDOException $e) {
        // Tables missing, auto-create them
        $sql = "
            CREATE TABLE IF NOT EXISTS users (
              id INT AUTO_INCREMENT PRIMARY KEY,
              username VARCHAR(50) UNIQUE NOT NULL,
              email VARCHAR(100) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              role ENUM('admin', 'user') DEFAULT 'admin',
              avatar VARCHAR(255) DEFAULT '',
              is_active TINYINT(1) DEFAULT 1,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

            CREATE TABLE IF NOT EXISTS email_otps (
              id INT AUTO_INCREMENT PRIMARY KEY,
              email VARCHAR(100) NOT NULL,
              otp VARCHAR(10) NOT NULL,
              expires_at TIMESTAMP NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

            CREATE TABLE IF NOT EXISTS contacts (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(100) NOT NULL,
              email VARCHAR(100) NOT NULL,
              phone VARCHAR(20),
              company VARCHAR(100),
              message TEXT NOT NULL,
              status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              INDEX idx_contacts_status (status)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

            CREATE TABLE IF NOT EXISTS demos (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(100) NOT NULL,
              email VARCHAR(100) NOT NULL,
              company VARCHAR(100),
              phone VARCHAR(20),
              industry VARCHAR(100),
              use_case TEXT,
              preferred_date DATE,
              preferred_time VARCHAR(20),
              status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
              notes TEXT,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              INDEX idx_demos_status (status)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

            CREATE TABLE IF NOT EXISTS categories (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(100) UNIQUE NOT NULL,
              slug VARCHAR(100) UNIQUE NOT NULL,
              description TEXT,
              color VARCHAR(30) DEFAULT '#6366F1',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

            CREATE TABLE IF NOT EXISTS tags (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(50) UNIQUE NOT NULL,
              slug VARCHAR(50) UNIQUE NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

            CREATE TABLE IF NOT EXISTS blogs (
              id INT AUTO_INCREMENT PRIMARY KEY,
              title VARCHAR(255) NOT NULL,
              slug VARCHAR(255) UNIQUE NOT NULL,
              excerpt TEXT NOT NULL,
              content TEXT NOT NULL,
              featured_image VARCHAR(255) DEFAULT '',
              gallery_images TEXT,
              category_id INT,
              author_name VARCHAR(100) DEFAULT 'AgentFlow AI',
              author_id INT,
              status ENUM('draft', 'published', 'scheduled') DEFAULT 'published',
              publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              read_time INT DEFAULT 5,
              views INT DEFAULT 0,
              is_featured TINYINT(1) DEFAULT 0,
              seo_title VARCHAR(255) DEFAULT '',
              seo_description TEXT,
              seo_keywords TEXT,
              canonical_url TEXT,
              og_image TEXT,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              INDEX idx_blogs_status_created (status, created_at),
              FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
              FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

            CREATE TABLE IF NOT EXISTS blog_tags (
              blog_id INT NOT NULL,
              tag_id INT NOT NULL,
              PRIMARY KEY (blog_id, tag_id),
              FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
              FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ";
        $pdo->exec($sql);

        // Seed default admin accounts
        $ins = $pdo->prepare("
            INSERT INTO users (id, username, email, password, role, is_active) 
            VALUES (1, 'admin', 'varmamanish341@gmail.com', '$2a$10$TnttoTThh6CG.6po9I8Ydeou2NhixKadm6ni2sg/OmsYX1JNfZKte', 'admin', 1)
            ON DUPLICATE KEY UPDATE password=VALUES(password)
        ");
        $ins->execute();

        $ins2 = $pdo->prepare("
            INSERT INTO users (id, username, email, password, role, is_active) 
            VALUES (2, 'sales_admin', 'sales@anvenssa.com', '$2a$10$2XCbqRlA2QdzsXVwgLvRbejWVgjC76av/WvWnPQuUGa.Hgd6xobsG', 'admin', 1)
            ON DUPLICATE KEY UPDATE password=VALUES(password)
        ");
        $ins2->execute();
    }
}

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
    ensureTablesExist($pdo);
} catch (PDOException $e) {
    sendError('Database connection failed: ' . $e->getMessage(), 500);
}

// Ensure Upload Directory exists
define('UPLOAD_DIR', __DIR__ . '/uploads');
if (!file_exists(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}

// Helper Functions
function sendJSON($data, $statusCode = 200) {
    ob_clean();
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function sendError($message, $statusCode = 500, $errors = []) {
    $response = ['message' => $message];
    if (!empty($errors)) {
        $response['errors'] = $errors;
    }
    sendJSON($response, $statusCode);
}

function getRequestBody() {
    $rawInput = file_get_contents('php://input');
    $decoded = json_decode($rawInput, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return $_POST;
    }
    return array_merge($_POST, $decoded ?? []);
}

function getCustomHeaders() {
    if (function_exists('getallheaders')) {
        return getallheaders();
    }
    $headers = [];
    foreach ($_SERVER as $name => $value) {
        if (substr($name, 0, 5) == 'HTTP_') {
            $key = str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))));
            $headers[$key] = $value;
        }
    }
    return $headers;
}

function getBearerToken() {
    $headers = getCustomHeaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    if (preg_match('/Bearer\s(\S+)/i', $authHeader, $matches)) {
        return $matches[1];
    }
    return null;
}

// Simple JWT Helper
class JWT {
    private static $secret = 'your-super-secret-jwt-key-change-this-in-production';

    public static function sign($payload) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $base64UrlHeader = self::base64UrlEncode($header);
        $base64UrlPayload = self::base64UrlEncode(json_encode($payload));
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::$secret, true);
        $base64UrlSignature = self::base64UrlEncode($signature);
        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public static function verify($token) {
        $parts = explode('.', $token);
        if (count($parts) !== 3) return false;
        list($header, $payload, $signature) = $parts;
        $signatureToVerify = hash_hmac('sha256', $header . "." . $payload, self::$secret, true);
        $base64UrlSignatureToVerify = self::base64UrlEncode($signatureToVerify);
        if (hash_equals($base64UrlSignatureToVerify, $signature)) {
            $decoded = json_decode(self::base64UrlDecode($payload), true);
            if (isset($decoded['exp']) && $decoded['exp'] < time()) {
                return false; // Expired
            }
            return $decoded;
        }
        return false;
    }

    private static function base64UrlEncode($data) {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
    }

    private static function base64UrlDecode($data) {
        $remainder = strlen($data) % 4;
        if ($remainder) {
            $padlen = 4 - $remainder;
            $data .= str_repeat('=', $padlen);
        }
        return base64_decode(str_replace(['-', '_'], ['+', '/'], $data));
    }
}

// Auth Middleware Guards
function requireAuth() {
    $token = getBearerToken();
    if (!$token) {
        sendError('Unauthorized: Token missing', 401);
    }
    $payload = JWT::verify($token);
    if (!$payload) {
        sendError('Unauthorized: Invalid or expired token', 401);
    }
    return $payload;
}

function requireAdmin() {
    $user = requireAuth();
    if (($user['role'] ?? '') !== 'admin') {
        sendError('Forbidden: Admin access required', 403);
    }
    return $user;
}

// Utility String Helpers
function slugify($text) {
    if (empty($text)) return '';
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    $text = strtolower($text);
    return empty($text) ? 'n-a' : $text;
}

function calculateReadTime($content) {
    if (empty($content)) return 3;
    $plainText = strip_tags($content);
    $words = count(preg_split('/\s+/', trim($plainText)));
    $wordsPerMinute = 200;
    return max(1, ceil($words / $wordsPerMinute));
}

function validatePhoneNumber($phone) {
    $cleanNumber = preg_replace('/[^\d]/', '', $phone);
    
    if (strpos($phone, '+91') === 0) {
        if (strlen($cleanNumber) !== 12) {
            return 'India phone number must be exactly 10 digits';
        }
    } elseif (strpos($phone, '+971') === 0) {
        if (strlen($cleanNumber) !== 12) {
            return 'UAE phone number must be exactly 9 digits';
        }
    } elseif (strpos($phone, '+1') === 0) {
        if (strlen($cleanNumber) !== 11) {
            return 'US/Canada phone number must be exactly 10 digits';
        }
    } elseif (strpos($phone, '+44') === 0) {
        if (strlen($cleanNumber) !== 12) {
            return 'UK phone number must be exactly 10 digits';
        }
    } elseif (strpos($phone, '+65') === 0) {
        if (strlen($cleanNumber) !== 10) {
            return 'Singapore phone number must be exactly 8 digits';
        }
    } elseif (strpos($phone, '+61') === 0) {
        if (strlen($cleanNumber) !== 11) {
            return 'Australia phone number must be exactly 9 digits';
        }
    } elseif (strpos($phone, '+966') === 0) {
        if (strlen($cleanNumber) !== 12) {
            return 'Saudi Arabia phone number must be exactly 9 digits';
        }
    } elseif (strpos($phone, '+974') === 0) {
        if (strlen($cleanNumber) !== 11) {
            return 'Qatar phone number must be exactly 8 digits';
        }
    } else {
        $len = strlen($cleanNumber);
        if ($len < 8 || $len > 15) {
            return 'Phone number must be between 8 and 15 digits';
        }
    }
    return true;
}

function attachBlogDetails($pdo, $blog) {
    if (!$blog) return null;
    
    // Parse gallery images
    $galleryImages = [];
    if (!empty($blog['gallery_images'])) {
        $galleryImages = json_decode($blog['gallery_images'], true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            $galleryImages = [];
        }
    }

    // Get Category
    $category = null;
    if (!empty($blog['category_id'])) {
        $stmt = $pdo->prepare("SELECT id, name, slug, color FROM categories WHERE id = ?");
        $stmt->execute([$blog['category_id']]);
        $category = $stmt->fetch();
    }
    if (!$category) {
        $category = ['name' => 'General', 'slug' => 'general', 'color' => '#6366F1'];
    }

    // Get Tags
    $stmt = $pdo->prepare("
        SELECT t.id, t.name, t.slug 
        FROM tags t
        JOIN blog_tags bt ON t.id = bt.tag_id
        WHERE bt.blog_id = ?
    ");
    $stmt->execute([$blog['id']]);
    $tags = $stmt->fetchAll() ?: [];

    $blog['gallery_images'] = $galleryImages;
    $blog['category'] = $category;
    $blog['tags'] = $tags;
    
    return $blog;
}

// Router Entry
$route = $_GET['route'] ?? '';
if (empty($route)) {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    if (preg_match('/\/api\/(.+)$/', $uri, $matches)) {
        $route = $matches[1];
    } elseif (preg_match('/\/api\.php\/(.+)$/', $uri, $matches)) {
        $route = $matches[1];
    }
}
$route = rtrim($route, '/');
$parts = explode('/', $route);
$method = $_SERVER['REQUEST_METHOD'];

// ==========================================
// ROUTE HANDLERS
// ==========================================

// 1. HEALTHCHECK
if ($route === 'health' && $method === 'GET') {
    sendJSON([
        'status' => 'OK',
        'message' => 'Server is running with MySQL database',
        'database' => DB_HOST . '/' . DB_NAME
    ]);
}

// 2. AUTHENTICATION ROUTES
if ($parts[0] === 'auth') {
    if ($parts[1] === 'login' && $method === 'POST') {
        $input = getRequestBody();
        $email = trim($input['email'] ?? '');
        $password = $input['password'] ?? '';
        
        if (empty($email) || empty($password)) {
            sendError('Email and password are required', 400);
        }

        $stmt = $pdo->prepare("SELECT * FROM users WHERE LOWER(email) = LOWER(?) AND is_active = 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password'])) {
            sendError('Invalid credentials', 401);
        }

        unset($user['password']);
        $token = JWT::sign([
            'userId' => $user['id'],
            'email' => $user['email'],
            'role' => $user['role'],
            'exp' => time() + 86400 // 24 hours
        ]);

        sendJSON([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token
        ]);
    }
    
    if ($parts[1] === 'register' && $method === 'POST') {
        $input = getRequestBody();
        $username = trim($input['username'] ?? '');
        $email = trim($input['email'] ?? '');
        $password = $input['password'] ?? '';
        $role = $input['role'] ?? 'user';

        if (strlen($username) < 3) sendError('Username must be at least 3 characters', 400);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) sendError('Please enter a valid email', 400);
        if (strlen($password) < 6) sendError('Password must be at least 6 characters', 400);

        $stmt = $pdo->prepare("SELECT id FROM users WHERE LOWER(email) = LOWER(?) OR LOWER(username) = LOWER(?)");
        $stmt->execute([$email, $username]);
        if ($stmt->fetch()) {
            sendError('User already exists', 400);
        }

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password, role, is_active) VALUES (?, ?, ?, ?, 1)");
        $stmt->execute([$username, $email, $hashedPassword, $role]);
        $userId = $pdo->lastInsertId();

        $stmt = $pdo->prepare("SELECT id, username, email, role, avatar, is_active, created_at FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        $newUser = $stmt->fetch();

        $token = JWT::sign([
            'userId' => $newUser['id'],
            'email' => $newUser['email'],
            'role' => $newUser['role'],
            'exp' => time() + 86400
        ]);

        sendJSON([
            'message' => 'User registered successfully',
            'user' => $newUser,
            'token' => $token
        ], 201);
    }

    if ($parts[1] === 'me' && $method === 'GET') {
        $tokenUser = requireAuth();
        $stmt = $pdo->prepare("SELECT id, username, email, role, avatar, is_active, created_at FROM users WHERE id = ? AND is_active = 1");
        $stmt->execute([$tokenUser['userId']]);
        $user = $stmt->fetch();
        if (!$user) sendError('User not found', 401);
        sendJSON(['user' => $user]);
    }
}

// OTP VERIFICATION ROUTES
if ($parts[0] === 'otp') {
    if ($parts[1] === 'send' && $method === 'POST') {
        $input = getRequestBody();
        $email = trim($input['email'] ?? '');

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            sendError('Please enter a valid email address', 400);
        }

        // Generate 6-digit OTP
        $otp = (string)rand(100000, 999999);

        // Delete any existing codes for this email
        $delStmt = $pdo->prepare("DELETE FROM email_otps WHERE email = ?");
        $delStmt->execute([$email]);

        // Insert new OTP valid for 10 minutes
        $insStmt = $pdo->prepare("
            INSERT INTO email_otps (email, otp, expires_at)
            VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))
        ");
        $insStmt->execute([$email, $otp]);

        // Send Email using PHP mail()
        $subject = "Your Verification Code - Agentfloww";
        $message = "Hello,\n\nYour verification code is: $otp\n\nThis code will expire in 10 minutes.\n\nBest regards,\nAgentfloww Team";
        $headers = "From: no-reply@agentfloww.com\r\n" .
                   "Reply-To: aditya@agentfloww.com\r\n" .
                   "X-Mailer: PHP/" . phpversion() . "\r\n" .
                   "Content-Type: text/plain; charset=UTF-8";

        $mailSent = @mail($email, $subject, $message, $headers);

        sendJSON([
            'success' => true,
            'message' => 'Verification code sent to ' . $email
        ]);
    }

    if ($parts[1] === 'verify' && $method === 'POST') {
        $input = getRequestBody();
        $email = trim($input['email'] ?? '');
        $otp = trim($input['otp'] ?? '');

        if (empty($email) || empty($otp)) {
            sendError('Email and verification code are required', 400);
        }

        // Check active OTP
        $stmt = $pdo->prepare("
            SELECT id FROM email_otps
            WHERE email = ? AND otp = ? AND expires_at > NOW()
            LIMIT 1
        ");
        $stmt->execute([$email, $otp]);
        $activeOtp = $stmt->fetch();

        if (!$activeOtp) {
            sendError('Invalid or expired verification code', 400);
        }

        // Delete verified OTP so it cannot be reused
        $delStmt = $pdo->prepare("DELETE FROM email_otps WHERE email = ?");
        $delStmt->execute([$email]);

        sendJSON([
            'success' => true,
            'message' => 'Email verified successfully'
        ]);
    }
}

// 3. CONTACT ROUTES
if ($parts[0] === 'contact') {
    if ($method === 'POST') {
        $input = getRequestBody();
        $name = trim($input['name'] ?? '');
        $email = trim($input['email'] ?? '');
        $phone = trim($input['phone'] ?? '');
        $company = trim($input['company'] ?? '');
        $message = trim($input['message'] ?? '');

        if (strlen($name) < 2 || strlen($name) > 100) sendError('Name must be between 2 and 100 characters', 400);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) sendError('Please enter a valid email', 400);
        
        $phoneVal = validatePhoneNumber($phone);
        if ($phoneVal !== true) sendError($phoneVal, 400);
        
        if (empty($company) || strlen($company) > 100) sendError('Company name is required and must be less than 100 characters', 400);
        if (empty($message) || strlen($message) > 1000) sendError('Message cannot be empty and must be less than 1000 characters', 400);

        $stmt = $pdo->prepare("INSERT INTO contacts (name, email, phone, company, message, status) VALUES (?, ?, ?, ?, ?, 'new')");
        $stmt->execute([$name, $email, $phone, $company, $message]);
        $contactId = $pdo->lastInsertId();

        $stmt = $pdo->prepare("SELECT * FROM contacts WHERE id = ?");
        $stmt->execute([$contactId]);
        $newContact = $stmt->fetch();

        sendJSON([
            'message' => 'Contact form submitted successfully',
            'contact' => $newContact
        ], 201);
    }
    
    if ($method === 'GET') {
        requireAdmin();
        $stmt = $pdo->query("SELECT * FROM contacts ORDER BY created_at DESC");
        sendJSON(['contacts' => $stmt->fetchAll()]);
    }

    if (isset($parts[1]) && is_numeric($parts[1])) {
        $id = (int)$parts[1];
        
        if ($method === 'GET') {
            requireAdmin();
            $stmt = $pdo->prepare("SELECT * FROM contacts WHERE id = ?");
            $stmt->execute([$id]);
            $contact = $stmt->fetch();
            if (!$contact) sendError('Contact not found', 404);
            sendJSON(['contact' => $contact]);
        }
        
        if ($method === 'DELETE') {
            requireAdmin();
            $stmt = $pdo->prepare("DELETE FROM contacts WHERE id = ?");
            $stmt->execute([$id]);
            if ($stmt->rowCount() === 0) sendError('Contact not found', 404);
            sendJSON(['message' => 'Contact deleted successfully']);
        }
        
        if (isset($parts[2]) && $parts[2] === 'status' && $method === 'PATCH') {
            requireAdmin();
            $input = getRequestBody();
            $status = $input['status'] ?? '';
            
            if (!in_array($status, ['new', 'read', 'replied', 'closed'])) {
                sendError('Invalid status', 400);
            }

            $stmt = $pdo->prepare("UPDATE contacts SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute([$status, $id]);
            if ($stmt->rowCount() === 0) sendError('Contact not found or status unchanged', 404);

            $stmt = $pdo->prepare("SELECT * FROM contacts WHERE id = ?");
            $stmt->execute([$id]);
            sendJSON([
                'message' => 'Contact status updated successfully',
                'contact' => $stmt->fetch()
            ]);
        }
    }
}

// 4. DEMO REQUESTS ROUTES
if ($parts[0] === 'demo') {
    if ($method === 'POST') {
        $input = getRequestBody();
        $name = trim($input['name'] ?? '');
        $email = trim($input['email'] ?? '');
        $company = trim($input['company'] ?? '');
        $phone = trim($input['phone'] ?? '');
        $industry = trim($input['industry'] ?? '');
        $useCase = trim($input['use_case'] ?? $input['message'] ?? '');
        $preferredDate = trim($input['preferred_date'] ?? '');
        $preferredTime = trim($input['preferred_time'] ?? '');

        if (empty($name)) sendError('Name is required', 400);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) sendError('Please enter a valid email', 400);
        
        $phoneVal = validatePhoneNumber($phone);
        if ($phoneVal !== true) sendError($phoneVal, 400);

        $stmt = $pdo->prepare("
            INSERT INTO demos (name, email, company, phone, industry, use_case, preferred_date, preferred_time, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')
        ");
        $stmt->execute([
            $name, 
            $email, 
            $company, 
            $phone, 
            $industry, 
            $useCase, 
            !empty($preferredDate) ? $preferredDate : null, 
            $preferredTime
        ]);
        $demoId = $pdo->lastInsertId();

        $stmt = $pdo->prepare("SELECT * FROM demos WHERE id = ?");
        $stmt->execute([$demoId]);
        sendJSON([
            'message' => 'Demo request submitted successfully',
            'demo' => $stmt->fetch()
        ], 201);
    }
    
    if ($method === 'GET') {
        requireAdmin();
        $stmt = $pdo->query("SELECT * FROM demos ORDER BY created_at DESC");
        sendJSON(['demos' => $stmt->fetchAll()]);
    }

    if (isset($parts[1]) && is_numeric($parts[1])) {
        $id = (int)$parts[1];
        
        if ($method === 'GET') {
            requireAdmin();
            $stmt = $pdo->prepare("SELECT * FROM demos WHERE id = ?");
            $stmt->execute([$id]);
            $demo = $stmt->fetch();
            if (!$demo) sendError('Demo request not found', 404);
            sendJSON(['demo' => $demo]);
        }
        
        if ($method === 'DELETE') {
            requireAdmin();
            $stmt = $pdo->prepare("DELETE FROM demos WHERE id = ?");
            $stmt->execute([$id]);
            if ($stmt->rowCount() === 0) sendError('Demo request not found', 404);
            sendJSON(['message' => 'Demo request deleted successfully']);
        }
        
        if (isset($parts[2]) && $parts[2] === 'status' && $method === 'PATCH') {
            requireAdmin();
            $input = getRequestBody();
            $status = $input['status'] ?? '';
            
            if (!in_array($status, ['pending', 'confirmed', 'completed', 'cancelled'])) {
                sendError('Invalid status', 400);
            }

            $stmt = $pdo->prepare("UPDATE demos SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute([$status, $id]);

            $stmt = $pdo->prepare("SELECT * FROM demos WHERE id = ?");
            $stmt->execute([$id]);
            sendJSON([
                'message' => 'Demo request status updated successfully',
                'demo' => $stmt->fetch()
            ]);
        }
    }
}

// 5. CATEGORIES ROUTES
if ($parts[0] === 'categories') {
    if ($method === 'GET') {
        // If categories/:identifier is requested
        if (isset($parts[1]) && !empty($parts[1])) {
            $identifier = $parts[1];
            if (is_numeric($identifier)) {
                $stmt = $pdo->prepare("SELECT * FROM categories WHERE id = ?");
                $stmt->execute([(int)$identifier]);
            } else {
                $stmt = $pdo->prepare("SELECT * FROM categories WHERE slug = ?");
                $stmt->execute([$identifier]);
            }
            $category = $stmt->fetch();
            if (!$category) sendError('Category not found', 404);
            sendJSON($category);
        } else {
            $stmt = $pdo->query("
                SELECT c.*, 
                  (SELECT COUNT(*) FROM blogs b WHERE b.category_id = c.id AND b.status = 'published') as post_count
                FROM categories c
                ORDER BY c.name ASC
            ");
            sendJSON($stmt->fetchAll());
        }
    }
    
    if ($method === 'POST') {
        requireAdmin();
        $input = getRequestBody();
        $name = trim($input['name'] ?? '');
        $description = trim($input['description'] ?? '');
        $color = trim($input['color'] ?? '#6366F1');
        
        if (empty($name)) sendError('Category name is required', 400);
        $slug = !empty($input['slug']) ? slugify($input['slug']) : slugify($name);

        $stmt = $pdo->prepare("SELECT id FROM categories WHERE slug = ? OR name = ?");
        $stmt->execute([$slug, $name]);
        if ($stmt->fetch()) {
            sendError('Category with this name or slug already exists', 400);
        }

        $stmt = $pdo->prepare("INSERT INTO categories (name, slug, description, color) VALUES (?, ?, ?, ?)");
        $stmt->execute([$name, $slug, $description, $color]);
        $catId = $pdo->lastInsertId();

        $stmt = $pdo->prepare("SELECT * FROM categories WHERE id = ?");
        $stmt->execute([$catId]);
        sendJSON($stmt->fetch(), 201);
    }

    if (isset($parts[1]) && is_numeric($parts[1])) {
        $id = (int)$parts[1];
        
        if ($method === 'PUT') {
            requireAdmin();
            $input = getRequestBody();
            $name = trim($input['name'] ?? '');
            $description = trim($input['description'] ?? '');
            $color = trim($input['color'] ?? '#6366F1');

            if (empty($name)) sendError('Category name is required', 400);
            $slug = !empty($input['slug']) ? slugify($input['slug']) : slugify($name);

            // Check duplicate slug
            $stmt = $pdo->prepare("SELECT id FROM categories WHERE slug = ? AND id != ?");
            $stmt->execute([$slug, $id]);
            if ($stmt->fetch()) {
                sendError('Category slug already in use by another category', 400);
            }

            $stmt = $pdo->prepare("UPDATE categories SET name = ?, slug = ?, description = ?, color = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute([$name, $slug, $description, $color, $id]);

            $stmt = $pdo->prepare("SELECT * FROM categories WHERE id = ?");
            $stmt->execute([$id]);
            sendJSON($stmt->fetch());
        }
        
        if ($method === 'DELETE') {
            requireAdmin();
            $stmt = $pdo->prepare("DELETE FROM categories WHERE id = ?");
            $stmt->execute([$id]);
            if ($stmt->rowCount() === 0) sendError('Category not found', 404);
            sendJSON(['message' => 'Category deleted successfully']);
        }
    }
}

// 6. TAGS ROUTES
if ($parts[0] === 'tags') {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM tags ORDER BY name ASC");
        sendJSON($stmt->fetchAll());
    }
    
    if ($method === 'POST') {
        requireAdmin();
        $input = getRequestBody();
        $name = trim($input['name'] ?? '');
        if (empty($name)) sendError('Tag name is required', 400);
        $slug = !empty($input['slug']) ? slugify($input['slug']) : slugify($name);

        $stmt = $pdo->prepare("SELECT id FROM tags WHERE slug = ? OR name = ?");
        $stmt->execute([$slug, $name]);
        if ($stmt->fetch()) {
            sendError('Tag already exists', 400);
        }

        $stmt = $pdo->prepare("INSERT INTO tags (name, slug) VALUES (?, ?)");
        $stmt->execute([$name, $slug]);
        $tagId = $pdo->lastInsertId();

        $stmt = $pdo->prepare("SELECT * FROM tags WHERE id = ?");
        $stmt->execute([$tagId]);
        sendJSON($stmt->fetch(), 201);
    }

    if (isset($parts[1]) && is_numeric($parts[1])) {
        $id = (int)$parts[1];
        
        if ($method === 'PUT') {
            requireAdmin();
            $input = getRequestBody();
            $name = trim($input['name'] ?? '');
            if (empty($name)) sendError('Tag name is required', 400);
            $slug = !empty($input['slug']) ? slugify($input['slug']) : slugify($name);

            $stmt = $pdo->prepare("SELECT id FROM tags WHERE slug = ? AND id != ?");
            $stmt->execute([$slug, $id]);
            if ($stmt->fetch()) {
                sendError('Tag slug already exists', 400);
            }

            $stmt = $pdo->prepare("UPDATE tags SET name = ?, slug = ? WHERE id = ?");
            $stmt->execute([$name, $slug, $id]);

            $stmt = $pdo->prepare("SELECT * FROM tags WHERE id = ?");
            $stmt->execute([$id]);
            sendJSON($stmt->fetch());
        }
        
        if ($method === 'DELETE') {
            requireAdmin();
            $stmt = $pdo->prepare("DELETE FROM tags WHERE id = ?");
            $stmt->execute([$id]);
            if ($stmt->rowCount() === 0) sendError('Tag not found', 404);
            sendJSON(['message' => 'Tag deleted successfully']);
        }
    }
}

// 7. BLOGS ROUTES
if ($parts[0] === 'blogs') {
    // Featured blogs
    if (($parts[1] ?? '') === 'featured' && $method === 'GET') {
        $stmt = $pdo->query("
            SELECT * FROM blogs 
            WHERE status = 'published'
            ORDER BY is_featured DESC, created_at DESC 
            LIMIT 3
        ");
        $blogs = $stmt->fetchAll();
        $result = [];
        foreach ($blogs as $b) {
            $result[] = attachBlogDetails($pdo, $b);
        }
        sendJSON($result);
    }
    
    // Admin list (All posts)
    if (($parts[1] ?? '') === 'admin' && ($parts[2] ?? '') === 'all' && $method === 'GET') {
        requireAdmin();
        $page = (int)($_GET['page'] ?? 1);
        $limit = (int)($_GET['limit'] ?? 50);
        $status = $_GET['status'] ?? '';
        $category = $_GET['category'] ?? '';
        $search = $_GET['search'] ?? '';

        $offset = ($page - 1) * $limit;
        $whereClause = [];
        $params = [];

        if (!empty($status) && $status !== 'all') {
            $whereClause[] = "b.status = ?";
            $params[] = $status;
        }

        if (!empty($category) && $category !== 'all') {
            $whereClause[] = "b.category_id = ?";
            $params[] = (int)$category;
        }

        if (!empty($search)) {
            $searchTerm = "%" . trim($search) . "%";
            $whereClause[] = "(b.title LIKE ? OR b.excerpt LIKE ?)";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }

        $whereString = !empty($whereClause) ? "WHERE " . implode(' AND ', $whereClause) : '';

        // Count
        $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM blogs b $whereString");
        $stmt->execute($params);
        $totalCount = (int)($stmt->fetch()['total'] ?? 0);

        // Fetch
        $querySql = "
            SELECT b.* 
            FROM blogs b 
            $whereString 
            ORDER BY b.created_at DESC 
            LIMIT :limit OFFSET :offset
        ";
        $stmt = $pdo->prepare($querySql);
        foreach ($params as $k => $val) {
            $stmt->bindValue($k + 1, $val);
        }
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        
        $blogs = $stmt->fetchAll();
        $result = [];
        foreach ($blogs as $b) {
            $result[] = attachBlogDetails($pdo, $b);
        }

        sendJSON([
            'blogs' => $result,
            'totalPages' => ceil($totalCount / $limit) ?: 1,
            'currentPage' => $page,
            'total' => $totalCount
        ]);
    }
    
    // Bulk actions
    if (($parts[1] ?? '') === 'bulk-action' && $method === 'POST') {
        requireAdmin();
        $input = getRequestBody();
        $action = $input['action'] ?? '';
        $ids = $input['ids'] ?? [];

        if (!is_array($ids) || empty($ids)) {
            sendError('No blog IDs provided', 400);
        }

        $placeholders = implode(',', array_fill(0, count($ids), '?'));

        if ($action === 'delete') {
            $stmt = $pdo->prepare("DELETE FROM blogs WHERE id IN ($placeholders)");
            $stmt->execute($ids);
            sendJSON(['message' => "Successfully deleted " . count($ids) . " posts"]);
        } elseif ($action === 'publish') {
            $stmt = $pdo->prepare("UPDATE blogs SET status = 'published', updated_at = CURRENT_TIMESTAMP WHERE id IN ($placeholders)");
            $stmt->execute($ids);
            sendJSON(['message' => "Successfully published " . count($ids) . " posts"]);
        } elseif ($action === 'unpublish') {
            $stmt = $pdo->prepare("UPDATE blogs SET status = 'draft', updated_at = CURRENT_TIMESTAMP WHERE id IN ($placeholders)");
            $stmt->execute($ids);
            sendJSON(['message' => "Successfully converted " . count($ids) . " posts to draft"]);
        } else {
            sendError('Invalid bulk action', 400);
        }
    }

    // Image Upload
    if (($parts[1] ?? '') === 'upload' && $method === 'POST') {
        requireAdmin();
        if (!isset($_FILES['image'])) {
            sendError('No image file uploaded', 400);
        }

        $file = $_FILES['image'];
        if ($file['error'] !== UPLOAD_ERR_OK) {
            sendError('File upload error code: ' . $file['error'], 400);
        }

        // Limit 5MB
        if ($file['size'] > 5 * 1024 * 1024) {
            sendError('Image size cannot exceed 5MB', 400);
        }

        $allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($ext, $allowedExts)) {
            sendError('Only images (jpg, jpeg, png, webp, gif) are allowed', 400);
        }

        $filename = time() . '-' . uniqid() . '.' . $ext;
        $destination = UPLOAD_DIR . '/' . $filename;

        if (move_uploaded_file($file['tmp_name'], $destination)) {
            sendJSON([
                'success' => true,
                'url' => '/uploads/' . $filename
            ]);
        } else {
            sendError('Failed to save uploaded file', 500);
        }
    }

    // Related blogs (blogs/:slug/related)
    if (isset($parts[1]) && ($parts[2] ?? '') === 'related' && $method === 'GET') {
        $slug = $parts[1];
        
        $stmt = $pdo->prepare("SELECT id, category_id FROM blogs WHERE slug = ?");
        $stmt->execute([$slug]);
        $currentBlog = $stmt->fetch();
        
        if (!$currentBlog) {
            sendJSON([]);
        }

        $related = [];
        if (!empty($currentBlog['category_id'])) {
            $stmt = $pdo->prepare("
                SELECT * FROM blogs 
                WHERE status = 'published' AND id != ? AND category_id = ? 
                ORDER BY created_at DESC 
                LIMIT 3
            ");
            $stmt->execute([$currentBlog['id'], $currentBlog['category_id']]);
            $related = $stmt->fetchAll() ?: [];
        }

        if (count($related) < 3) {
            $excludeIds = array_merge([$currentBlog['id']], array_column($related, 'id'));
            $placeholders = implode(',', array_fill(0, count($excludeIds), '?'));
            $needed = 3 - count($related);
            
            $stmt = $pdo->prepare("
                SELECT * FROM blogs 
                WHERE status = 'published' AND id NOT IN ($placeholders)
                ORDER BY created_at DESC 
                LIMIT $needed
            ");
            $stmt->execute($excludeIds);
            $fallback = $stmt->fetchAll() ?: [];
            $related = array_merge($related, $fallback);
        }

        $result = [];
        foreach ($related as $b) {
            $result[] = attachBlogDetails($pdo, $b);
        }
        sendJSON($result);
    }

    // Toggle status (PATCH blogs/:id/status)
    if (isset($parts[1]) && is_numeric($parts[1]) && ($parts[2] ?? '') === 'status' && $method === 'PATCH') {
        requireAdmin();
        $id = (int)$parts[1];
        $input = getRequestBody();
        $status = $input['status'] ?? '';

        if (!in_array($status, ['published', 'draft', 'scheduled'])) {
            sendError('Invalid status value', 400);
        }

        $stmt = $pdo->prepare("UPDATE blogs SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
        $stmt->execute([$status, $id]);

        $stmt = $pdo->prepare("SELECT * FROM blogs WHERE id = ?");
        $stmt->execute([$id]);
        sendJSON(attachBlogDetails($pdo, $stmt->fetch()));
    }

    // Duplicate blog (POST blogs/:id/duplicate)
    if (isset($parts[1]) && is_numeric($parts[1]) && ($parts[2] ?? '') === 'duplicate' && $method === 'POST') {
        requireAdmin();
        $id = (int)$parts[1];

        $stmt = $pdo->prepare("SELECT * FROM blogs WHERE id = ?");
        $stmt->execute([$id]);
        $original = $stmt->fetch();

        if (!$original) {
            sendError('Original blog post not found', 404);
        }

        $newTitle = 'Copy of ' . $original['title'];
        $newSlug = slugify($original['slug'] . '-copy-' . substr(time(), -4));

        $stmt = $pdo->prepare("
            INSERT INTO blogs (
              title, slug, excerpt, content, featured_image, gallery_images,
              category_id, author_name, status, publish_date, read_time,
              is_featured, seo_title, seo_description, seo_keywords,
              canonical_url, og_image
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'draft', CURRENT_TIMESTAMP, ?, 0, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $newTitle,
            $newSlug,
            $original['excerpt'],
            $original['content'],
            $original['featured_image'],
            $original['gallery_images'],
            $original['category_id'],
            $original['author_name'],
            $original['read_time'],
            $newTitle,
            $original['seo_description'],
            $original['seo_keywords'],
            $original['canonical_url'],
            $original['og_image']
        ]);
        $newId = $pdo->lastInsertId();

        // Copy tags
        $stmt = $pdo->prepare("SELECT tag_id FROM blog_tags WHERE blog_id = ?");
        $stmt->execute([$id]);
        $tags = $stmt->fetchAll();
        foreach ($tags as $t) {
            $stmtBT = $pdo->prepare("INSERT INTO blog_tags (blog_id, tag_id) VALUES (?, ?)");
            $stmtBT->execute([$newId, $t['tag_id']]);
        }

        $stmt = $pdo->prepare("SELECT * FROM blogs WHERE id = ?");
        $stmt->execute([$newId]);
        sendJSON(attachBlogDetails($pdo, $stmt->fetch()), 201);
    }

    // Single Blog (GET blogs/:slug) or edit (PUT blogs/:id) or delete (DELETE blogs/:id)
    if (isset($parts[1]) && !empty($parts[1])) {
        $identifier = $parts[1];

        // DELETE
        if (is_numeric($identifier) && $method === 'DELETE') {
            requireAdmin();
            $stmt = $pdo->prepare("DELETE FROM blogs WHERE id = ?");
            $stmt->execute([(int)$identifier]);
            if ($stmt->rowCount() === 0) sendError('Blog post not found', 404);
            sendJSON(['message' => 'Blog post deleted successfully']);
        }
        
        // PUT (Edit by ID)
        if (is_numeric($identifier) && $method === 'PUT') {
            requireAdmin();
            $id = (int)$identifier;
            $input = getRequestBody();

            $stmt = $pdo->prepare("SELECT * FROM blogs WHERE id = ?");
            $stmt->execute([$id]);
            $existing = $stmt->fetch();
            if (!$existing) sendError('Blog post not found', 404);

            $title = trim($input['title'] ?? $existing['title']);
            if (empty($title)) sendError('Title is required', 400);

            $slug = !empty($input['slug']) ? slugify($input['slug']) : slugify($title);
            
            // Check duplicate slug
            $stmt = $pdo->prepare("SELECT id FROM blogs WHERE slug = ? AND id != ?");
            $stmt->execute([$slug, $id]);
            if ($stmt->fetch()) {
                $slug = $slug . '-' . substr(time(), -4);
            }

            $excerpt = $input['excerpt'] ?? $existing['excerpt'];
            $content = $input['content'] ?? $existing['content'];
            $featuredImage = $input['featured_image'] ?? $existing['featured_image'];
            $galleryImages = isset($input['gallery_images']) ? json_encode($input['gallery_images']) : $existing['gallery_images'];
            $categoryId = array_key_exists('category_id', $input) ? $input['category_id'] : $existing['category_id'];
            $authorName = $input['author_name'] ?? $existing['author_name'];
            $status = $input['status'] ?? $existing['status'];
            $publishDate = $input['publish_date'] ?? $existing['publish_date'];
            $readTime = isset($input['read_time']) ? (int)$input['read_time'] : calculateReadTime($content);
            $isFeatured = isset($input['is_featured']) ? ($input['is_featured'] ? 1 : 0) : $existing['is_featured'];
            $seoTitle = $input['seo_title'] ?? $existing['seo_title'];
            $seoDescription = $input['seo_description'] ?? $existing['seo_description'];
            $seoKeywords = $input['seo_keywords'] ?? $existing['seo_keywords'];
            $canonicalUrl = $input['canonical_url'] ?? $existing['canonical_url'];
            $ogImage = $input['og_image'] ?? $existing['og_image'];

            $stmt = $pdo->prepare("
                UPDATE blogs SET
                  title = ?, slug = ?, excerpt = ?, content = ?, featured_image = ?, gallery_images = ?,
                  category_id = ?, author_name = ?, status = ?, publish_date = ?, read_time = ?,
                  is_featured = ?, seo_title = ?, seo_description = ?, seo_keywords = ?,
                  canonical_url = ?, og_image = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            ");
            $stmt->execute([
                $title, $slug, $excerpt, $content, $featuredImage, $galleryImages,
                $categoryId, $authorName, $status, $publishDate, $readTime,
                $isFeatured, $seoTitle, $seoDescription, $seoKeywords,
                $canonicalUrl, $ogImage, $id
            ]);

            // Handle Tags
            if (isset($input['tags']) && is_array($input['tags'])) {
                $stmt = $pdo->prepare("DELETE FROM blog_tags WHERE blog_id = ?");
                $stmt->execute([$id]);

                foreach ($input['tags'] as $tagItem) {
                    $tagId = null;
                    if (is_numeric($tagItem)) {
                        $tagId = (int)$tagItem;
                    } elseif (is_string($tagItem)) {
                        $tSlug = slugify($tagItem);
                        $tagStmt = $pdo->prepare("SELECT id FROM tags WHERE slug = ?");
                        $tagStmt->execute([$tSlug]);
                        $tagObj = $tagStmt->fetch();
                        if (!$tagObj) {
                            $insTag = $pdo->prepare("INSERT INTO tags (name, slug) VALUES (?, ?)");
                            $insTag->execute([trim($tagItem), $tSlug]);
                            $tagId = $pdo->lastInsertId();
                        } else {
                            $tagId = $tagObj['id'];
                        }
                    }
                    if ($tagId) {
                        $insBt = $pdo->prepare("INSERT IGNORE INTO blog_tags (blog_id, tag_id) VALUES (?, ?)");
                        $insBt->execute([$id, $tagId]);
                    }
                }
            }

            $stmt = $pdo->prepare("SELECT * FROM blogs WHERE id = ?");
            $stmt->execute([$id]);
            sendJSON(attachBlogDetails($pdo, $stmt->fetch()));
        }

        // GET (View by Slug)
        if ($method === 'GET' && !is_numeric($identifier)) {
            $stmt = $pdo->prepare("SELECT * FROM blogs WHERE slug = ?");
            $stmt->execute([$identifier]);
            $blog = $stmt->fetch();
            if (!$blog) sendError('Blog post not found', 404);

            // Increment views
            $stmtViews = $pdo->prepare("UPDATE blogs SET views = views + 1 WHERE id = ?");
            $stmtViews->execute([$blog['id']]);
            $blog['views'] += 1;

            sendJSON(attachBlogDetails($pdo, $blog));
        }
    }
    
    // GET all published blogs (Public Listing) or POST new blog
    if ($method === 'GET') {
        $page = (int)($_GET['page'] ?? 1);
        $limit = (int)($_GET['limit'] ?? 9);
        $category = $_GET['category'] ?? '';
        $tag = $_GET['tag'] ?? '';
        $search = $_GET['search'] ?? '';
        $sort = $_GET['sort'] ?? 'newest';
        $featured = $_GET['featured'] ?? '';

        $offset = ($page - 1) * $limit;
        $whereClause = ["b.status = 'published'"];
        $params = [];

        if (!empty($category)) {
            if (is_numeric($category)) {
                $whereClause[] = "b.category_id = ?";
                $params[] = (int)$category;
            } else {
                $stmt = $pdo->prepare("SELECT id FROM categories WHERE slug = ?");
                $stmt->execute([$category]);
                $catObj = $stmt->fetch();
                if ($catObj) {
                    $whereClause[] = "b.category_id = ?";
                    $params[] = $catObj['id'];
                } else {
                    sendJSON(['blogs' => [], 'totalPages' => 0, 'currentPage' => $page, 'total' => 0]);
                }
            }
        }

        if (!empty($tag)) {
            if (is_numeric($tag)) {
                $whereClause[] = "b.id IN (SELECT blog_id FROM blog_tags WHERE tag_id = ?)";
                $params[] = (int)$tag;
            } else {
                $stmt = $pdo->prepare("SELECT id FROM tags WHERE slug = ?");
                $stmt->execute([$tag]);
                $tagObj = $stmt->fetch();
                if ($tagObj) {
                    $whereClause[] = "b.id IN (SELECT blog_id FROM blog_tags WHERE tag_id = ?)";
                    $params[] = $tagObj['id'];
                } else {
                    sendJSON(['blogs' => [], 'totalPages' => 0, 'currentPage' => $page, 'total' => 0]);
                }
            }
        }

        if ($featured === 'true' || $featured === '1') {
            $whereClause[] = "b.is_featured = 1";
        }

        if (!empty($search)) {
            $searchTerm = "%" . trim($search) . "%";
            $whereClause[] = "(
                b.title LIKE ? OR 
                b.excerpt LIKE ? OR 
                b.content LIKE ? OR 
                b.id IN (
                    SELECT bt.blog_id FROM blog_tags bt 
                    JOIN tags t ON bt.tag_id = t.id 
                    WHERE t.name LIKE ? OR t.slug LIKE ?
                )
            )";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }

        $orderBy = 'b.created_at DESC';
        if ($sort === 'oldest') {
            $orderBy = 'b.created_at ASC';
        } elseif ($sort === 'most_viewed') {
            $orderBy = 'b.views DESC, b.created_at DESC';
        } elseif ($sort === 'recently_updated') {
            $orderBy = 'b.updated_at DESC';
        }

        $whereString = "WHERE " . implode(' AND ', $whereClause);

        // Count Total
        $stmt = $pdo->prepare("SELECT COUNT(DISTINCT b.id) as total FROM blogs b $whereString");
        $stmt->execute($params);
        $totalCount = (int)($stmt->fetch()['total'] ?? 0);

        // Fetch paginated
        $querySql = "
            SELECT DISTINCT b.* 
            FROM blogs b 
            $whereString 
            ORDER BY $orderBy 
            LIMIT :limit OFFSET :offset
        ";
        $stmt = $pdo->prepare($querySql);
        foreach ($params as $k => $val) {
            $stmt->bindValue($k + 1, $val);
        }
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        
        $blogs = $stmt->fetchAll();
        $result = [];
        foreach ($blogs as $b) {
            $result[] = attachBlogDetails($pdo, $b);
        }

        sendJSON([
            'blogs' => $result,
            'totalPages' => ceil($totalCount / $limit) ?: 1,
            'currentPage' => $page,
            'total' => $totalCount
        ]);
    }
    
    if ($method === 'POST') {
        requireAdmin();
        $input = getRequestBody();
        
        $title = trim($input['title'] ?? '');
        $content = trim($input['content'] ?? '');
        
        if (empty($title)) sendError('Title is required', 400);
        if (empty($content)) sendError('Content is required', 400);

        $excerpt = trim($input['excerpt'] ?? '');
        $featuredImage = $input['featured_image'] ?? '';
        $galleryImages = isset($input['gallery_images']) ? json_encode($input['gallery_images']) : '[]';
        $categoryId = $input['category_id'] ?? null;
        $categoryName = $input['category_name'] ?? '';
        $tags = $input['tags'] ?? [];
        $authorName = $input['author_name'] ?? 'AgentFlow AI';
        $status = $input['status'] ?? 'published';
        $publishDate = $input['publish_date'] ?? date('Y-m-d H:i:s');
        $readTime = isset($input['read_time']) ? (int)$input['read_time'] : calculateReadTime($content);
        $isFeatured = isset($input['is_featured']) ? ($input['is_featured'] ? 1 : 0) : 0;
        $seoTitle = $input['seo_title'] ?? $title;
        $seoDescription = $input['seo_description'] ?? $excerpt;
        $seoKeywords = $input['seo_keywords'] ?? '';
        $canonicalUrl = $input['canonical_url'] ?? '';
        $ogImage = $input['og_image'] ?? $featuredImage;

        $slug = !empty($input['slug']) ? slugify($input['slug']) : slugify($title);
        
        // Ensure slug uniqueness
        $stmt = $pdo->prepare("SELECT id FROM blogs WHERE slug = ?");
        $stmt->execute([$slug]);
        if ($stmt->fetch()) {
            $slug = $slug . '-' . substr(time(), -4);
        }

        // Resolve Category from Name if ID is not provided
        if (empty($categoryId) && !empty($categoryName)) {
            $catSlug = slugify($categoryName);
            $stmt = $pdo->prepare("SELECT id FROM categories WHERE slug = ?");
            $stmt->execute([$catSlug]);
            $catObj = $stmt->fetch();
            if (!$catObj) {
                $insCat = $pdo->prepare("INSERT INTO categories (name, slug) VALUES (?, ?)");
                $insCat->execute([$categoryName, $catSlug]);
                $categoryId = $pdo->lastInsertId();
            } else {
                $categoryId = $catObj['id'];
            }
        }

        if (empty($excerpt)) {
            $excerpt = substr(strip_tags($content), 0, 160) . '...';
        }

        $stmt = $pdo->prepare("
            INSERT INTO blogs (
                title, slug, excerpt, content, featured_image, gallery_images,
                category_id, author_name, status, publish_date, read_time,
                is_featured, seo_title, seo_description, seo_keywords,
                canonical_url, og_image
            ) VALUES (
                ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?,
                ?, ?
            )
        ");
        $stmt->execute([
            $title, $slug, $excerpt, $content, $featuredImage, $galleryImages,
            $categoryId, $authorName, $status, $publishDate, $readTime,
            $isFeatured, $seoTitle, $seoDescription, $seoKeywords,
            $canonicalUrl, $ogImage
        ]);
        $blogId = $pdo->lastInsertId();

        // Process Tags
        if (is_array($tags) && !empty($tags)) {
            foreach ($tags as $tagItem) {
                $tagId = null;
                if (is_numeric($tagItem)) {
                    $tagId = (int)$tagItem;
                } elseif (is_string($tagItem)) {
                    $tSlug = slugify($tagItem);
                    $stmt = $pdo->prepare("SELECT id FROM tags WHERE slug = ?");
                    $stmt->execute([$tSlug]);
                    $tagObj = $stmt->fetch();
                    if (!$tagObj) {
                        $insTag = $pdo->prepare("INSERT INTO tags (name, slug) VALUES (?, ?)");
                        $insTag->execute([trim($tagItem), $tSlug]);
                        $tagId = $pdo->lastInsertId();
                    } else {
                        $tagId = $tagObj['id'];
                    }
                }

                if ($tagId) {
                    $insBt = $pdo->prepare("INSERT IGNORE INTO blog_tags (blog_id, tag_id) VALUES (?, ?)");
                    $insBt->execute([$blogId, $tagId]);
                }
            }
        }

        $stmt = $pdo->prepare("SELECT * FROM blogs WHERE id = ?");
        $stmt->execute([$blogId]);
        sendJSON(attachBlogDetails($pdo, $stmt->fetch()), 201);
    }
}

// 8. ADMIN DASHBOARD & USERS ROUTES
if ($parts[0] === 'admin') {
    requireAdmin();

    if (($parts[1] ?? '') === 'dashboard' && $method === 'GET') {
        // Stats counts
        $uCount = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
        $cCount = $pdo->query("SELECT COUNT(*) FROM contacts")->fetchColumn();
        $dCount = $pdo->query("SELECT COUNT(*) FROM demos")->fetchColumn();

        // Recent listings
        $recentContacts = $pdo->query("SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5")->fetchAll();
        $recentDemos = $pdo->query("SELECT * FROM demos ORDER BY created_at DESC LIMIT 5")->fetchAll();

        // Stats grouping
        $contactStats = $pdo->query("SELECT status, COUNT(*) as count FROM contacts GROUP BY status")->fetchAll();
        $demoStats = $pdo->query("SELECT status, COUNT(*) as count FROM demos GROUP BY status")->fetchAll();

        sendJSON([
            'stats' => [
                'users' => (int)$uCount,
                'contacts' => (int)$cCount,
                'demos' => (int)$dCount
            ],
            'recentContacts' => $recentContacts ?: [],
            'recentDemos' => $recentDemos ?: [],
            'contactStats' => $contactStats ?: [],
            'demoStats' => $demoStats ?: []
        ]);
    }

    if (($parts[1] ?? '') === 'users') {
        // GET users list
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT id, username, email, role, avatar, is_active, created_at, updated_at FROM users ORDER BY created_at DESC");
            sendJSON(['users' => $stmt->fetchAll()]);
        }
        
        // POST new user
        if ($method === 'POST') {
            $input = getRequestBody();
            $username = trim($input['username'] ?? '');
            $email = trim($input['email'] ?? '');
            $password = $input['password'] ?? '';
            $role = $input['role'] ?? 'user';

            if (strlen($username) < 3 || strlen($username) > 50) sendError('Username must be between 3 and 50 characters', 400);
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) sendError('Please enter a valid email', 400);
            if (strlen($password) < 6) sendError('Password must be at least 6 characters', 400);
            if (!in_array($role, ['admin', 'user'])) sendError('Invalid role', 400);

            // Check duplicate
            $stmt = $pdo->prepare("SELECT id FROM users WHERE LOWER(email) = LOWER(?) OR LOWER(username) = LOWER(?)");
            $stmt->execute([$email, $username]);
            if ($stmt->fetch()) {
                sendError('User already exists', 400);
            }

            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
            $stmt = $pdo->prepare("INSERT INTO users (username, email, password, role, is_active) VALUES (?, ?, ?, ?, 1)");
            $stmt->execute([$username, $email, $hashedPassword, $role]);
            $userId = $pdo->lastInsertId();

            $stmt = $pdo->prepare("SELECT id, username, email, role, avatar, is_active, created_at FROM users WHERE id = ?");
            $stmt->execute([$userId]);
            sendJSON([
                'message' => 'User created successfully',
                'user' => $stmt->fetch()
            ], 201);
        }

        // Edit or Delete user
        if (isset($parts[2]) && is_numeric($parts[2])) {
            $userId = (int)$parts[2];

            if ($method === 'PUT') {
                $input = getRequestBody();
                
                // Fetch existing
                $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
                $stmt->execute([$userId]);
                $user = $stmt->fetch();
                if (!$user) sendError('User not found', 404);

                $username = trim($input['username'] ?? $user['username']);
                $email = trim($input['email'] ?? $user['email']);
                $role = $input['role'] ?? $user['role'];
                $isActive = isset($input['is_active']) ? ($input['is_active'] ? 1 : 0) : $user['is_active'];

                $stmt = $pdo->prepare("UPDATE users SET username = ?, email = ?, role = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
                $stmt->execute([$username, $email, $role, $isActive, $userId]);

                $stmt = $pdo->prepare("SELECT id, username, email, role, avatar, is_active, created_at FROM users WHERE id = ?");
                $stmt->execute([$userId]);
                sendJSON([
                    'message' => 'User updated successfully',
                    'user' => $stmt->fetch()
                ]);
            }

            if ($method === 'DELETE') {
                $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
                $stmt->execute([$userId]);
                if ($stmt->rowCount() === 0) sendError('User not found', 404);
                sendJSON(['message' => 'User deleted successfully']);
            }
        }
    }
}

// 404 Fallback
sendError('API Route Not Found', 404);
ob_end_flush();
