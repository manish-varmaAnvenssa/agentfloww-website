const mongoose = require('mongoose');
const Blog = require('./models/Blog');
const News = require('./models/News');
const User = require('./models/User');
require('dotenv').config();

const viewData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('\n=== BLOGS DATA ===');
    const blogs = await Blog.find({}).populate('author', 'username email');
    console.log(`Total blogs: ${blogs.length}`);
    
    blogs.forEach((blog, index) => {
      console.log(`\nBlog ${index + 1}:`);
      console.log(`  ID: ${blog._id}`);
      console.log(`  Title: ${blog.title}`);
      console.log(`  Slug: ${blog.slug}`);
      console.log(`  Status: ${blog.status}`);
      console.log(`  Category: ${blog.category}`);
      console.log(`  Author: ${blog.author?.username || 'Unknown'}`);
      console.log(`  Created: ${blog.createdAt}`);
      console.log(`  Featured Image: ${blog.featuredImage}`);
      console.log(`  Excerpt: ${blog.excerpt?.substring(0, 100)}...`);
    });

    console.log('\n=== NEWS DATA ===');
    const news = await News.find({}).populate('author', 'username email');
    console.log(`Total news: ${news.length}`);
    
    news.forEach((item, index) => {
      console.log(`\nNews ${index + 1}:`);
      console.log(`  ID: ${item._id}`);
      console.log(`  Title: ${item.title}`);
      console.log(`  Slug: ${item.slug}`);
      console.log(`  Status: ${item.status}`);
      console.log(`  Category: ${item.category}`);
      console.log(`  Author: ${item.author?.username || 'Unknown'}`);
      console.log(`  Created: ${item.createdAt}`);
      console.log(`  Featured Image: ${item.featuredImage}`);
      console.log(`  Excerpt: ${item.excerpt?.substring(0, 100)}...`);
    });

  } catch (error) {
    console.error('Error viewing data:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

viewData(); 