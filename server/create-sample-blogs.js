const mongoose = require('mongoose');
const Blog = require('./models/Blog');
const User = require('./models/User');
require('dotenv').config();

const createSampleBlogs = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find an admin user to use as author
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.log('No admin user found. Please create an admin user first.');
      return;
    }

    console.log(`Using admin user: ${adminUser.username}`);

    // Sample blog posts data
    const sampleBlogs = [
      {
        title: "The Future of AI Automation in Business",
        excerpt: "Discover how artificial intelligence is revolutionizing business processes and creating new opportunities for automation across industries.",
        content: "Artificial intelligence has become a game-changer in the business world. From customer service automation to predictive analytics, AI is transforming how companies operate and compete in the digital age. This comprehensive guide explores the latest trends, technologies, and strategies for implementing AI automation in your business.",
        featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
        category: "Technology",
        tags: ["AI", "Automation", "Business", "Technology"],
        status: "published",
        readTime: 8
      },
      {
        title: "Building Scalable AI Agents for Customer Service",
        excerpt: "Learn the best practices for developing and deploying AI agents that can handle customer inquiries efficiently and provide exceptional service experiences.",
        content: "Customer service is one of the most critical touchpoints between businesses and their customers. With the rise of AI technology, companies can now deploy intelligent agents that provide 24/7 support, handle multiple inquiries simultaneously, and deliver personalized experiences. This article covers the essential components of building scalable AI agents.",
        featuredImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop",
        category: "Business",
        tags: ["Customer Service", "AI Agents", "Automation", "Scalability"],
        status: "published",
        readTime: 6
      },
      {
        title: "Designing Conversational AI Interfaces",
        excerpt: "Explore the principles of creating intuitive and engaging conversational AI interfaces that users love to interact with.",
        content: "The success of any AI system depends heavily on its user interface. Conversational AI interfaces need to be intuitive, engaging, and capable of understanding user intent accurately. This guide covers the fundamental principles of designing effective conversational interfaces, from natural language processing to user experience considerations.",
        featuredImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
        category: "Design",
        tags: ["UI/UX", "Conversational AI", "Design", "User Experience"],
        status: "published",
        readTime: 7
      },
      {
        title: "Marketing Automation with AI: A Complete Guide",
        excerpt: "Discover how AI-powered marketing automation can boost your campaigns, improve ROI, and create more personalized customer experiences.",
        content: "Marketing automation has evolved significantly with the integration of AI technologies. Today's marketers can leverage machine learning algorithms to segment audiences, personalize content, optimize campaigns, and predict customer behavior. This comprehensive guide shows you how to implement AI-driven marketing automation strategies.",
        featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        category: "Marketing",
        tags: ["Marketing", "Automation", "AI", "ROI"],
        status: "published",
        readTime: 9
      }
    ];

    // Create blog posts
    for (const blogData of sampleBlogs) {
      const existingBlog = await Blog.findOne({ title: blogData.title });
      
      if (existingBlog) {
        console.log(`Blog "${blogData.title}" already exists, skipping...`);
        continue;
      }

      const blog = new Blog({
        ...blogData,
        author: adminUser._id
      });

      await blog.save();
      console.log(`Created blog: "${blogData.title}"`);
    }

    console.log('\nSample blogs created successfully!');
    
    // Display created blogs
    const blogs = await Blog.find({}).populate('author', 'username');
    console.log(`\nTotal blogs in database: ${blogs.length}`);
    
    blogs.forEach((blog, index) => {
      console.log(`${index + 1}. ${blog.title} (${blog.status})`);
    });

  } catch (error) {
    console.error('Error creating sample blogs:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

createSampleBlogs(); 