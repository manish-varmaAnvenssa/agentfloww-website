const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, 'data', 'agentflow.db');

// Ensure data directory exists
const fs = require('fs');
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database
const db = new Database(dbPath);

console.log('🚀 Initializing SQLite Database...');

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
try {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'user')),
      avatar TEXT DEFAULT '',
      is_active BOOLEAN DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Contact form submissions
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      phone VARCHAR(20),
      company VARCHAR(100),
      message TEXT NOT NULL,
      status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Live demo requests
  db.exec(`
    CREATE TABLE IF NOT EXISTS demos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      company VARCHAR(100),
      phone VARCHAR(20),
      industry VARCHAR(100),
      use_case TEXT,
      preferred_date DATE,
      preferred_time VARCHAR(20),
      status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('✅ Database tables created successfully!');

  // Create default admin user if not exists
  const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get('varmamanish341@gmail.com');
  
  if (!adminExists) {
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    const insertAdmin = db.prepare(`
      INSERT INTO users (username, email, password, role, is_active) 
      VALUES (?, ?, ?, ?, ?)
    `);
    
    insertAdmin.run('admin', 'varmamanish341@gmail.com', hashedPassword, 'admin', 1);
    console.log('✅ Default admin user created: varmamanish341@gmail.com / admin123');
  } else {
    console.log('ℹ️ Admin user already exists');
  }

  // Create indexes for better performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
    CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
    CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
    CREATE INDEX IF NOT EXISTS idx_demos_email ON demos(email);
    CREATE INDEX IF NOT EXISTS idx_demos_status ON demos(status);
  `);

  console.log('✅ Database indexes created successfully!');

} catch (error) {
  console.error('❌ Error creating database:', error);
  process.exit(1);
}

console.log('🎉 Database initialization completed!');
console.log(`📁 Database file: ${dbPath}`);
console.log('🚀 You can now start your server with: npm start');

db.close();
