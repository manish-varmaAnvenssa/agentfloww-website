const mongoose = require('mongoose');
const User = require('./models/User');
const Blog = require('./models/Blog');
const News = require('./models/News');
const KnowledgeBase = require('./models/KnowledgeBase');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/anvenssa', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Helper function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

const createSampleContent = async () => {
  try {
    console.log('Creating sample content...');

    // Find or create a user for the content
    let user = await User.findOne({ username: 'manish.varma' });
    if (!user) {
      user = await User.findOne({ role: 'admin' });
      if (!user) {
        console.log('No admin user found. Please create an admin user first.');
        return;
      }
    }

    // Clear existing content
    await Blog.deleteMany({});
    await News.deleteMany({});
    await KnowledgeBase.deleteMany({});

    console.log('Cleared existing content');

    // Create Blog Posts (Product features, analytics, technical content)
    const blogPosts = [
      {
        title: 'New Features Released: Enhanced Analytics and Multi-Channel Integration',
        excerpt: 'Discover the latest enhancements to our analytics dashboard, including real-time data visualization, advanced reporting capabilities, and seamless multi-channel integration for better business insights.',
        content: 'We are excited to announce the release of our enhanced analytics platform with powerful new features designed to give you deeper insights into your business performance. Our new dashboard provides real-time updates with interactive charts and graphs that help you understand your data at a glance.',
        featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        category: 'Technology',
        tags: ['analytics', 'features', 'dashboard', 'integration'],
        status: 'published',
        readTime: 8,
        views: 1250,
        likes: 89
      },
      {
        title: 'The Future of AI-Powered Customer Support: Trends and Predictions',
        excerpt: 'Explore how artificial intelligence is revolutionizing customer support, from chatbots to predictive analytics, and what this means for businesses in 2024 and beyond.',
        content: 'Artificial intelligence is transforming how businesses interact with their customers. Modern chatbots can handle complex queries and provide personalized responses, reducing wait times and improving customer satisfaction.',
        featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
        category: 'Technology',
        tags: ['AI', 'customer-support', 'chatbots', 'automation'],
        status: 'published',
        readTime: 12,
        views: 2100,
        likes: 156
      },
      {
        title: 'Optimizing Your Marketing Strategy with Data-Driven Insights',
        excerpt: 'Learn how to leverage data analytics to create more effective marketing campaigns, improve ROI, and better understand your target audience.',
        content: 'Data-driven marketing is no longer optional—it is essential for success in today\'s competitive landscape. Use data to identify and target specific customer segments with personalized messaging.',
        featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        category: 'Marketing',
        tags: ['marketing', 'analytics', 'ROI', 'strategy'],
        status: 'published',
        readTime: 10,
        views: 1800,
        likes: 134
      }
    ];

    // Create News Articles (Company news, industry recognition, announcements)
    const newsArticles = [
      {
        title: 'Anvenssa Receives Industry Recognition for Innovation in AI Technology',
        summary: 'Anvenssa has been awarded the prestigious "Innovation Excellence Award" for its groundbreaking work in artificial intelligence and customer experience automation.',
        content: 'We are thrilled to announce that Anvenssa has been recognized with the prestigious "Innovation Excellence Award" at the 2024 Tech Innovation Summit. This recognition validates our commitment to pushing the boundaries of what is possible with AI technology.',
        featuredImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop',
        type: 'announcement',
        tags: ['award', 'innovation', 'AI', 'recognition'],
        status: 'published',
        views: 3200,
        publishDate: new Date('2024-07-29')
      },
      {
        title: 'Anvenssa Expands Global Operations with New European Office',
        summary: 'Anvenssa announces the opening of its new European headquarters in Amsterdam, marking a significant milestone in our global expansion strategy.',
        content: 'Anvenssa is excited to announce the opening of our new European headquarters in Amsterdam, Netherlands. This expansion represents a significant milestone in our global growth strategy and commitment to serving customers worldwide.',
        featuredImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
        type: 'company-news',
        tags: ['expansion', 'Europe', 'Amsterdam', 'global'],
        status: 'published',
        views: 2800,
        publishDate: new Date('2024-07-28')
      },
      {
        title: 'Anvenssa Partners with Leading Universities for AI Research Initiative',
        summary: 'Anvenssa has announced strategic partnerships with top universities to advance AI research and develop next-generation customer experience technologies.',
        content: 'Anvenssa is proud to announce strategic partnerships with leading universities to advance artificial intelligence research and develop next-generation customer experience technologies.',
        featuredImage: 'https://images.unsplash.com/photo-1523240794102-9ebd0b167f3f?w=800&h=600&fit=crop',
        type: 'press-release',
        tags: ['partnership', 'research', 'universities', 'AI'],
        status: 'published',
        views: 1900,
        publishDate: new Date('2024-07-27')
      }
    ];

    // Create Knowledge Base Articles (AI guides, tutorials, educational content)
    const knowledgeBaseArticles = [
      {
        title: 'How AI is Transforming Business Communication in 2024',
        summary: 'Learn how artificial intelligence is revolutionizing business communication, from automated responses to intelligent routing and personalized interactions.',
        content: 'Artificial intelligence is fundamentally changing how businesses communicate with customers, employees, and partners. AI-powered chatbots and virtual assistants are handling routine customer inquiries 24/7, providing instant responses and reducing wait times.',
        featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
        category: 'features',
        difficulty: 'intermediate',
        tags: ['AI', 'communication', 'automation', 'business'],
        status: 'published',
        views: 4500,
        helpful: 89,
        notHelpful: 3,
        publishDate: new Date('2024-07-29')
      },
      {
        title: 'Getting Started with Anvenssa AI Platform: A Complete Beginner Guide',
        summary: 'New to Anvenssa? This comprehensive guide will walk you through setting up your account, configuring your first AI agent, and getting started with automation.',
        content: 'Welcome to Anvenssa! This guide will help you get up and running with our AI platform quickly and efficiently. Start by creating your account and setting up your first AI agent.',
        featuredImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
        category: 'getting-started',
        difficulty: 'beginner',
        tags: ['getting-started', 'setup', 'guide', 'tutorial'],
        status: 'published',
        views: 8900,
        helpful: 234,
        notHelpful: 12,
        publishDate: new Date('2024-07-28')
      },
      {
        title: 'Advanced API Integration: Building Custom Workflows with Anvenssa',
        summary: 'Learn how to leverage Anvenssa\'s powerful API to create custom workflows, integrate with your existing systems, and build sophisticated automation solutions.',
        content: 'Anvenssa\'s REST API provides powerful capabilities for building custom integrations and workflows. This guide covers advanced techniques for developers and technical teams.',
        featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
        category: 'api',
        difficulty: 'advanced',
        tags: ['API', 'integration', 'workflows', 'development'],
        status: 'published',
        views: 3200,
        helpful: 67,
        notHelpful: 8,
        publishDate: new Date('2024-07-27')
      }
    ];

    // Insert Blog Posts
    for (const blogData of blogPosts) {
      const blog = new Blog({
        ...blogData,
        author: user._id
      });
      await blog.save();
      console.log(`Created blog: ${blog.title}`);
    }

    // Insert News Articles
    for (const newsData of newsArticles) {
      const news = new News({
        ...newsData,
        slug: generateSlug(newsData.title),
        author: user._id
      });
      await news.save();
      console.log(`Created news: ${news.title}`);
    }

    // Insert Knowledge Base Articles
    for (const kbData of knowledgeBaseArticles) {
      const kb = new KnowledgeBase({
        ...kbData,
        slug: generateSlug(kbData.title),
        author: user._id
      });
      await kb.save();
      console.log(`Created knowledge base article: ${kb.title}`);
    }

    console.log('Sample content created successfully!');
    console.log(`Created ${blogPosts.length} blog posts`);
    console.log(`Created ${newsArticles.length} news articles`);
    console.log(`Created ${knowledgeBaseArticles.length} knowledge base articles`);

  } catch (error) {
    console.error('Error creating sample content:', error);
  } finally {
    mongoose.connection.close();
  }
};

createSampleContent(); 