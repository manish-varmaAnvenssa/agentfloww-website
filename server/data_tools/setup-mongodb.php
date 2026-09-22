<?php
// MongoDB Setup Script - Run this once to set up your database
header('Content-Type: application/json');

// MongoDB connection
$mongoUri = 'mongodb+srv://manishvarma:buIjNlvrcNvgMTNU@cluster0.mul1djh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
$databaseName = 'agentflow';

try {
    // Connect to MongoDB
    $client = new MongoDB\Client($mongoUri);
    $database = $client->selectDatabase($databaseName);
    
    echo "Connected to MongoDB successfully!\n";
    
    // Create collections
    $usersCollection = $database->users;
    $contactsCollection = $database->contacts;
    $demosCollection = $database->demos;
    
    echo "Collections created successfully!\n";
    
    // Check if admin user already exists
    $existingAdmin = $usersCollection->findOne(['email' => 'varmamanish341@gmail.com']);
    
    if (!$existingAdmin) {
        // Create admin user
        $adminUser = [
            'username' => 'admin',
            'email' => 'varmamanish341@gmail.com',
            'password' => 'admin123',
            'role' => 'admin',
            'created_at' => new MongoDB\BSON\UTCDateTime()
        ];
        
        $result = $usersCollection->insertOne($adminUser);
        
        if ($result->getInsertedCount() > 0) {
            echo "Admin user created successfully!\n";
            echo "Email: varmamanish341@gmail.com\n";
            echo "Password: admin123\n";
        } else {
            echo "Failed to create admin user!\n";
        }
    } else {
        echo "Admin user already exists!\n";
    }
    
    // Create indexes for better performance
    $usersCollection->createIndex(['email' => 1], ['unique' => true]);
    $contactsCollection->createIndex(['created_at' => -1]);
    $demosCollection->createIndex(['created_at' => -1]);
    
    echo "Database indexes created successfully!\n";
    echo "MongoDB setup completed!\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>

