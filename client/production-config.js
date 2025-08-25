// Production Configuration for Hostinger Hosting
export const PRODUCTION_CONFIG = {
  // Database Configuration
  DB_HOST: 'localhost',
  DB_USER: 'u430499725_agentfloww',
  DB_PASSWORD: 'Z2mw0bd0d#1',
  DB_NAME: 'u430499725_agentfloww',
  
  // App Configuration
  APP_NAME: 'Agentflow',
  APP_VERSION: '1.0.0',
  
  // Feature Flags
  ENABLE_ANALYTICS: false,
  ENABLE_DEBUG: false,
  
  // Build Information
  BUILD_DATE: new Date().toISOString(),
  BUILD_ENV: 'production',
  
  // API Configuration (for future use)
  API_BASE_URL: window.location.origin
};
