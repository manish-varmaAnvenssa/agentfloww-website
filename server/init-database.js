const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT, 10) || 3306;
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbName = process.env.DB_NAME || 'agentflow';

const initDatabase = async () => {
  try {
    console.log(`🚀 Connecting to MySQL server at ${dbHost}:${dbPort}...`);
    
    // Create connection without db name to ensure DB exists
    const connection = await mysql.createConnection({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword
    });
    
    console.log(`🚀 Ensuring database "${dbName}" exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await connection.end();
    
    console.log(`✅ Database "${dbName}" checked/created successfully.`);

    // Import the database pool adapter now that the DB exists
    const { getDatabase } = require('./database');
    const db = getDatabase();

    // Create Tables
    console.log('🚀 Creating MySQL tables...');

    // Users table
    await db.exec(`
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
    `);

    // Email OTPs table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS email_otps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        otp VARCHAR(10) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Contact form submissions
    await db.exec(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        company VARCHAR(100),
        message TEXT NOT NULL,
        status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Live demo requests
    await db.exec(`
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
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Categories table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        color VARCHAR(30) DEFAULT '#6366F1',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Tags table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS tags (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        slug VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Blogs table
    await db.exec(`
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
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Blog Tags junction table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS blog_tags (
        blog_id INT NOT NULL,
        tag_id INT NOT NULL,
        PRIMARY KEY (blog_id, tag_id),
        FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    console.log('✅ Database tables created successfully!');

    // Create default admin user if not exists
    const adminExists = await db.prepare('SELECT id FROM users WHERE email = ?').get('varmamanish341@gmail.com');
    if (!adminExists) {
      const hashedPassword = bcrypt.hashSync('admin123', 10);
      await db.prepare(`
        INSERT INTO users (username, email, password, role, is_active) 
        VALUES (?, ?, ?, ?, ?)
      `).run('admin', 'varmamanish341@gmail.com', hashedPassword, 'admin', 1);
      console.log('✅ Default admin user created: varmamanish341@gmail.com / admin123');
    } else {
      console.log('ℹ️ Default admin user already exists.');
    }

    // Create sales_admin user if not exists
    const salesAdminExists = await db.prepare('SELECT id FROM users WHERE LOWER(email) = LOWER(?)').get('sales@anvenssa.com');
    if (!salesAdminExists) {
      const hashedPassword = bcrypt.hashSync('A2mw0bdod#1', 10);
      await db.prepare(`
        INSERT INTO users (username, email, password, role, is_active) 
        VALUES (?, ?, ?, ?, ?)
      `).run('sales_admin', 'sales@anvenssa.com', hashedPassword, 'admin', 1);
      console.log('✅ Sales admin user created: sales@anvenssa.com / A2mw0bdod#1');
    } else {
      console.log('ℹ️ Sales admin user already exists.');
    }

    // Create indexes for better performance
    try {
      await db.exec('CREATE INDEX idx_contacts_status ON contacts(status)');
    } catch(e) {}
    try {
      await db.exec('CREATE INDEX idx_demos_status ON demos(status)');
    } catch(e) {}
    try {
      await db.exec('CREATE INDEX idx_blogs_status_created ON blogs(status, created_at)');
    } catch(e) {}

    console.log('✅ Database indexes verified!');
    console.log('🎉 Database initialization completed!');
    
  } catch (error) {
    console.error('❌ Error creating/initializing database:', error);
    throw error;
  }
};

// Run immediately if this script is executed directly
if (require.main === module) {
  (async () => {
    try {
      await initDatabase();
      const { db } = require('./database');
      await db.close();
      process.exit(0);
    } catch (e) {
      process.exit(1);
    }
  })();
}

module.exports = initDatabase;
