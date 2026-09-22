const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy header when behind a reverse proxy (like Hostinger's proxy setup)
app.set('trust proxy', 1);

// Middleware to strip Hostinger Passenger subfolder prefixes (like /server or /index.js) from URL paths
app.use((req, res, next) => {
  const prefixes = ['/server', '/public_html/server', '/public_html', '/index.js'];
  for (const prefix of prefixes) {
    if (req.url.startsWith(prefix)) {
      req.url = req.url.substring(prefix.length) || '/';
    }
    if (req.originalUrl.startsWith(prefix)) {
      req.originalUrl = req.originalUrl.substring(prefix.length) || '/';
    }
  }
  console.log(`[REQUEST] ${req.method} ${req.url} (Original: ${req.originalUrl})`);
  next();
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Helper to resolve the permanent public_html absolute path on Hostinger's build system
const getPublicHtmlPath = () => {
  const fs = require('fs');
  const currentPath = __dirname;
  
  if (currentPath.includes('.builds')) {
    const basePath = currentPath.substring(0, currentPath.indexOf('.builds'));
    
    const possiblePaths = [
      path.join(basePath, 'public_html'),
      path.join(basePath, '..', 'agentfloww.com', 'public_html'),
      path.join(basePath, '..', '..', 'public_html')
    ];
    
    for (const p of possiblePaths) {
      if (fs.existsSync(path.join(p, 'index.html'))) {
        console.log(`💡 Found index.html at path: ${p}`);
        return p;
      }
    }
    
    // Default fallback to preview domain path if index.html is missing everywhere
    return path.join(basePath, 'public_html');
  }
  return path.join(__dirname, '..');
};
const publicHtmlPath = getPublicHtmlPath();

// Serve static uploads (from permanent public_html/uploads on Hostinger, or public/uploads locally)
const uploadsPath = __dirname.includes('.builds')
  ? path.join(publicHtmlPath, 'uploads')
  : path.join(__dirname, 'public', 'uploads');
app.use('/uploads', express.static(uploadsPath));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/demo', require('./routes/demos'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/tags', require('./routes/tags'));
app.use('/api/otp', require('./routes/otp'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running with MySQL database',
    database: `${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}/${process.env.DB_NAME || 'agentflow'}`
  });
});

// Serve static React build files from public_html
app.use(express.static(publicHtmlPath));

// Fallback all frontend routes to React's index.html for Single Page Application routing
app.get('*', (req, res) => {
  // If the request starts with /api/, let it fall through (or return a JSON 404)
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ message: 'API Route Not Found' });
  }
  res.sendFile(path.join(publicHtmlPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server after database is initialized
const initDatabase = require('./init-database');

(async () => {
  try {
    console.log('=== ENVIRONMENT VARIABLES ===');
    console.log('PORT:', process.env.PORT);
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
    console.log('CLIENT_URL:', process.env.CLIENT_URL);
    console.log('DB_HOST:', process.env.DB_HOST || 'localhost');
    console.log('DB_NAME:', process.env.DB_NAME || 'agentflow');
    console.log('=== END ENVIRONMENT VARIABLES ===');

    console.log('🔌 Connecting to MySQL and initializing tables...');
    await initDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`💾 Using MySQL database: ${process.env.DB_HOST || 'localhost'}/${process.env.DB_NAME || 'agentflow'}`);
    });
  } catch (error) {
    console.error('❌ Failed to initialize database. Server NOT started.', error.message);
    process.exit(1);
  }
})();