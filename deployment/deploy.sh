#!/bin/bash
# Agentflow Deployment Script

echo "🚀 Deploying Agentflow..."

# Update system
sudo apt update

# Install Node.js and npm if not installed
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
fi

# Install nginx if not installed
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing nginx..."
    sudo apt install -y nginx
fi

# Create application directory
sudo mkdir -p /var/www/agentflow
sudo chown $USER:$USER /var/www/agentflow

# Copy application files
cp -r * /var/www/agentflow/

# Install dependencies
cd /var/www/agentflow
npm install

# Set up environment variables
echo "⚠️  Please update the .env.production file with your actual values"
cp server/.env.production server/.env

# Start application with PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save

# Configure nginx
sudo cp nginx.conf /etc/nginx/sites-available/agentflow
sudo ln -sf /etc/nginx/sites-available/agentflow /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

echo "✅ Deployment completed!"
echo "🌐 Your application should be available at: http://yourdomain.com"
echo "🔧 To check status: pm2 status"
echo "📝 To view logs: pm2 logs agentflow-backend"