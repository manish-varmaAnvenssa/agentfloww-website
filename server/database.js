const Database = require('better-sqlite3');
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, 'data', 'agentflow.db');

// Create database connection
const db = new Database(dbPath, { verbose: console.log });

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create a function to get database instance
const getDatabase = () => {
  return db;
};

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🔄 Closing database connection...');
  db.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🔄 Closing database connection...');
  db.close();
  process.exit(0);
});

module.exports = { getDatabase, db };
