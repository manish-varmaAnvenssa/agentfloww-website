<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Simple test endpoint
if ($_GET['action'] === 'test') {
    echo json_encode(['success' => true, 'message' => 'API is working!']);
    exit;
}

// MongoDB connection using simple HTTP requests
$clusterName = 'cluster0';
$databaseName = 'agentflow';
$username = 'manishvarma';
$password = 'buljNlvrcNvgMTNU';

try {
    $action = $_GET['action'] ?? '';
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if ($action === 'login') {
            $email = $data['email'] ?? '';
            $password_input = $data['password'] ?? '';
            
            // Simple file-based authentication for now
            $users_file = 'users.json';
            $users = [];
            
            if (file_exists($users_file)) {
                $users = json_decode(file_get_contents($users_file), true);
            }
            
            // Always ensure both admin accounts exist
            $required_admins = [
                [
                    'username' => 'admin',
                    'email' => 'varmamanish341@gmail.com',
                    'password' => 'admin123',
                    'role' => 'admin',
                    'created_at' => '2025-01-19 10:00:00'
                ],
                [
                    'username' => 'sales_admin',
                    'email' => 'sales@anvenssa.COM',
                    'password' => 'A2mw0bdod#1',
                    'role' => 'admin',
                    'created_at' => '2025-01-19 10:00:00'
                ]
            ];
            
            // Check if required admin accounts exist, add them if they don't
            foreach ($required_admins as $required_admin) {
                $admin_exists = false;
                foreach ($users as $user) {
                    if (strtolower($user['email']) === strtolower($required_admin['email'])) {
                        $admin_exists = true;
                        break;
                    }
                }
                if (!$admin_exists) {
                    $users[] = $required_admin;
                }
            }
            
            // Save updated users list
            file_put_contents($users_file, json_encode($users));
            
            // Check credentials
            $user_found = null;
            foreach ($users as $user) {
                if (strtolower($user['email']) === strtolower($email) && $user['password'] === $password_input) {
                    $user_found = $user;
                    break;
                }
            }
            
            if ($user_found) {
                echo json_encode(['success' => true, 'user' => $user_found]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Invalid credentials']);
            }
        }
        
        if ($action === 'contact') {
            $name = $data['name'] ?? '';
            $email = $data['email'] ?? '';
            $phone = $data['phone'] ?? '';
            $company = $data['company'] ?? '';
            $subject = $data['subject'] ?? '';
            $message = $data['message'] ?? '';
            
            // Save to contacts file
            $contacts_file = 'contacts.json';
            $contacts = [];
            if (file_exists($contacts_file)) {
                $contacts = json_decode(file_get_contents($contacts_file), true);
            }
            
            $new_contact = [
                'id' => time(),
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'company' => $company,
                'subject' => $subject,
                'message' => $message,
                'status' => 'new',
                'created_at' => date('Y-m-d H:i:s')
            ];
            
            $contacts[] = $new_contact;
            file_put_contents($contacts_file, json_encode($contacts));
            
            echo json_encode(['success' => true, 'message' => 'Contact submitted']);
        }
        
        if ($action === 'demo') {
            $name = $data['name'] ?? '';
            $email = $data['email'] ?? '';
            $company = $data['company'] ?? '';
            $phone = $data['phone'] ?? '';
            $industry = $data['industry'] ?? '';
            $use_case = $data['use_case'] ?? ($data['message'] ?? '');
            $preferred_date = $data['preferred_date'] ?? '';
            $preferred_time = $data['preferred_time'] ?? '';
            
            // Save to demos file
            $demos_file = 'demos.json';
            $demos = [];
            if (file_exists($demos_file)) {
                $demos = json_decode(file_get_contents($demos_file), true);
            }
            
            $new_demo = [
                'id' => time(),
                'name' => $name,
                'email' => $email,
                'company' => $company,
                'phone' => $phone,
                'industry' => $industry,
                'use_case' => $use_case,
                'preferred_date' => $preferred_date,
                'preferred_time' => $preferred_time,
                'status' => 'pending',
                'created_at' => date('Y-m-d H:i:s')
            ];
            
            $demos[] = $new_demo;
            file_put_contents($demos_file, json_encode($demos));
            
            echo json_encode(['success' => true, 'message' => 'Demo submitted']);
        }
    }
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if ($action === 'contacts') {
            $contacts_file = 'contacts.json';
            $contacts = [];
            if (file_exists($contacts_file)) {
                $contacts = json_decode(file_get_contents($contacts_file), true);
            }
            
            // Sort by creation date (newest first)
            usort($contacts, function($a, $b) {
                return strtotime($b['created_at']) - strtotime($a['created_at']);
            });
            
            echo json_encode(['success' => true, 'contacts' => $contacts]);
        }
        
        if ($action === 'demos') {
            $demos_file = 'demos.json';
            $demos = [];
            if (file_exists($demos_file)) {
                $demos = json_decode(file_get_contents($demos_file), true);
            }
            
            // Sort by creation date (newest first)
            usort($demos, function($a, $b) {
                return strtotime($b['created_at']) - strtotime($a['created_at']);
            });
            
            echo json_encode(['success' => true, 'demos' => $demos]);
        }
    }
    
} catch (Exception $e) {
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
