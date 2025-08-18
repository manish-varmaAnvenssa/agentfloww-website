const mongoose = require('mongoose');
require('dotenv').config();

const cleanupDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/anvenssa');
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;

    // Collections to delete
    const collectionsToDelete = [
      'blogs',
      'news', 
      'knowledgebases',
      'notifications'
    ];

    console.log('Starting database cleanup...');

    for (const collectionName of collectionsToDelete) {
      try {
        // Check if collection exists
        const collections = await db.listCollections({ name: collectionName }).toArray();
        
        if (collections.length > 0) {
          // Drop the collection
          await db.dropCollection(collectionName);
          console.log(`✅ Successfully deleted collection: ${collectionName}`);
        } else {
          console.log(`ℹ️  Collection ${collectionName} does not exist, skipping...`);
        }
      } catch (error) {
        console.error(`❌ Error deleting collection ${collectionName}:`, error.message);
      }
    }

    console.log('\n🎉 Database cleanup completed!');
    console.log('\nDeleted collections:');
    collectionsToDelete.forEach(collection => {
      console.log(`  - ${collection}`);
    });

  } catch (error) {
    console.error('❌ Error connecting to database:', error.message);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
};

// Run the cleanup
cleanupDatabase(); 