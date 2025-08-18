# MongoDB Atlas Setup Guide for Hostinger

## 🎯 **Step 1: Create MongoDB Atlas Account**
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Click "Try Free" or "Start Free"
3. Sign up with your email or Google account

## 🚀 **Step 2: Create Free Cluster**
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select cloud provider (AWS, Google Cloud, or Azure)
4. Choose region closest to your users
5. Click "Create"

## 🔑 **Step 3: Get Connection String**
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `<dbname>` with `agentflow`

## ⚙️ **Step 4: Update Your Backend**
1. Create `.env` file in your server folder:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agentflow?retryWrites=true&w=majority
JWT_SECRET=your-secret-key
PORT=5000
CLIENT_URL=https://yourdomain.com
```

## 🌐 **Step 5: Deploy to Hostinger**
1. Upload your `server/` folder to Hostinger
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Your admin panel will now work with cloud database!

## 💡 **Benefits:**
- ✅ **Free forever** (512MB storage)
- ✅ **No server management**
- ✅ **Automatic backups**
- ✅ **Global access**
- ✅ **Easy scaling**

## 🔧 **Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/agentflow?retryWrites=true&w=majority
```

## 📱 **Test Your Setup:**
- Admin login: `varmamanish341@gmail.com` / `admin123`
- All data will be stored in the cloud
- Access from anywhere in the world

