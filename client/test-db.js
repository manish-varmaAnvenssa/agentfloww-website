import { testConnection } from './src/utils/database.js';

async function test() {
  console.log('Testing database connection...');
  const isConnected = await testConnection();
  
  if (isConnected) {
    console.log('🎉 Database is ready to use!');
    console.log('✅ You can now run your application');
  } else {
    console.log('💥 Database connection failed. Check your credentials.');
    console.log('Make sure to:');
    console.log('1. Update the password in src/utils/database.js');
    console.log('2. Create the database tables in phpMyAdmin');
    console.log('3. Insert the admin user');
  }
  
  process.exit();
}

test();
