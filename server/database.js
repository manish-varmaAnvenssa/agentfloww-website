const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'agentflow',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true // Enable for init scripts
});

// Database adapter wrapping mysql2 to mimic better-sqlite3 API style (returns Promises)
const db = {
  prepare: (sql) => {
    // Map SQLite syntax to MySQL syntax if needed
    let processedSql = sql;
    
    // SQLite uses "LOWER(email) = LOWER(?)" which works in MySQL.
    // Let's replace "INSERT OR IGNORE" with "INSERT IGNORE"
    processedSql = processedSql.replace(/INSERT OR IGNORE/gi, 'INSERT IGNORE');
    
    return {
      get: async (...params) => {
        // Support both .get(a, b) and .get([a, b]) calling styles
        const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params.flat();
        const [rows] = await pool.query(processedSql, flatParams.length ? flatParams : []);
        return rows[0] || null;
      },
      all: async (...params) => {
        // Support both .all(a, b) and .all([a, b]) calling styles
        const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params.flat();
        const [rows] = await pool.query(processedSql, flatParams.length ? flatParams : []);
        return rows;
      },
      run: async (...params) => {
        const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params.flat();
        const [result] = await pool.query(processedSql, flatParams.length ? flatParams : []);
        return {
          changes: result.affectedRows,
          lastInsertRowid: result.insertId
        };
      }
    };
  },
  exec: async (sql) => {
    // Replace SQLite specific schema declarations in raw SQL scripts
    let processedSql = sql
      .replace(/INTEGER PRIMARY KEY AUTOINCREMENT/gi, 'INT AUTO_INCREMENT PRIMARY KEY')
      .replace(/INSERT OR IGNORE/gi, 'INSERT IGNORE')
      .replace(/BOOLEAN DEFAULT 1/gi, 'TINYINT(1) DEFAULT 1')
      .replace(/BOOLEAN DEFAULT 0/gi, 'TINYINT(1) DEFAULT 0');
      
    const [result] = await pool.query(processedSql);
    return result;
  },
  pragma: async (sql) => {
    // PRAGMAs are SQLite specific. Ignore.
    return;
  },
  close: async () => {
    console.log('🔄 Closing database pool...');
    await pool.end();
  }
};

const getDatabase = () => {
  return db;
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔄 Closing database connection pool...');
  await db.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🔄 Closing database connection pool...');
  await db.close();
  process.exit(0);
});

module.exports = { getDatabase, db };
