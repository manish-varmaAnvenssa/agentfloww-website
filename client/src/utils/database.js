import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',  // Use localhost when deployed to Hostinger
    port: 3306,  // Default MySQL port
    user: 'u430499725_agentfloww',
    password: 'Z2mw0bd0d#1',
    database: 'u430499725_agentfloww',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: false,
    connectTimeout: 60000,
    charset: 'utf8mb4'
};
 

const pool = mysql.createPool(dbConfig);

// Test connection function
async function testConnection() {
  try {
    console.log('Attempting to connect to database...');
    console.log('Host:', dbConfig.host);
    console.log('Port:', dbConfig.port);
    console.log('User:', dbConfig.user);
    console.log('Database:', dbConfig.database);
    
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully!');
    console.log('Connected to:', connection.config.host);
    console.log('Server version:', connection.serverVersion);
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Error code:', error.code);
    console.error('Error number:', error.errno);
    
    // Additional debugging info
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('🔒 Access denied - This usually means:');
      console.error('   - IP address not whitelisted in Remote MySQL');
      console.error('   - Wrong username/password');
      console.error('   - User permissions insufficient');
      console.error('   - Remote MySQL access not yet active');
    }
    
    return false;
  }
}

export { pool, testConnection };
