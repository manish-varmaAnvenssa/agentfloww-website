// Production Configuration for Hostinger Hosting
export const PRODUCTION_CONFIG = {
  // API Configuration
  API_BASE_URL: 'https://your-backend-domain.com/api', // Replace with your actual backend domain
  
  // App Configuration
  APP_NAME: 'Agentflow',
  APP_VERSION: '1.0.0',
  
  // Feature Flags
  ENABLE_ANALYTICS: true,
  ENABLE_DEBUG: false,
  
  // Build Information
  BUILD_DATE: new Date().toISOString(),
  BUILD_ENV: 'production'
};

// Instructions for Hostinger Deployment:
// 1. Replace 'your-backend-domain.com' with your actual backend server domain
// 2. Upload the entire 'dist' folder contents to your Hostinger public_html directory
// 3. Ensure your domain points to the hosting
// 4. Test all functionality after deployment
