# 🚀 Hostinger Frontend Deployment Guide

## 📋 Prerequisites
- ✅ Frontend built successfully (`npm run build` completed)
- ✅ Hostinger hosting account
- ✅ Domain name (new or existing)

## 🔧 Step-by-Step Deployment

### **Step 1: Access Your Built Files**
Your production-ready files are located in:
```
client/dist/
├── index.html
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
└── [other static files]
```

### **Step 2: Hostinger Control Panel Setup**

1. **Login to Hostinger**
   - Go to [hpanel.hostinger.com](https://hpanel.hostinger.com)
   - Login with your credentials

2. **Domain Management**
   - Go to "Domains" section
   - Add your new domain or use existing one
   - Ensure domain points to your hosting

3. **File Manager Access**
   - Go to "Hosting" → "Manage" → "File Manager"
   - Navigate to `public_html` folder

### **Step 3: Upload Frontend Files**

1. **Clear public_html (if needed)**
   - Delete any existing files in `public_html`
   - Keep the folder structure clean

2. **Upload Your Files**
   - Select ALL files from `client/dist/`
   - Upload them directly to `public_html`
   - Ensure `index.html` is in the root of `public_html`

### **Step 4: Configure Backend API**

**IMPORTANT**: Before your frontend works, you need to:

1. **Update API Base URL**
   - Edit `client/src/utils/api.js`
   - Change baseURL from `/api` to your backend domain
   - Example: `https://your-backend.com/api`

2. **Rebuild Frontend**
   ```bash
   cd client
   npm run build
   ```

3. **Re-upload the new dist folder**

### **Step 5: Test Your Deployment**

1. **Visit Your Domain**
   - Open your domain in browser
   - Check if the site loads correctly

2. **Test Functionality**
   - Navigation between pages
   - Forms submission
   - Admin login (if applicable)

## ⚠️ Common Issues & Solutions

### **Issue: Site shows blank page**
- **Solution**: Check if `index.html` is in the correct location
- **Solution**: Ensure all asset files are uploaded

### **Issue: API calls fail**
- **Solution**: Verify backend API base URL is correct
- **Solution**: Check if backend server is running and accessible

### **Issue: CSS/JS not loading**
- **Solution**: Verify asset paths in `index.html`
- **Solution**: Check file permissions on Hostinger

## 🔒 Security Considerations

1. **HTTPS**: Enable SSL certificate in Hostinger
2. **File Permissions**: Set appropriate permissions (usually 644 for files, 755 for folders)
3. **Environment Variables**: Don't expose sensitive data in frontend

## 📱 Performance Optimization

1. **Enable Gzip Compression** (usually enabled by default on Hostinger)
2. **Browser Caching**: Set appropriate cache headers
3. **CDN**: Consider using Hostinger's CDN for better performance

## 🆘 Need Help?

- **Hostinger Support**: Available 24/7 in your control panel
- **Documentation**: Check Hostinger's knowledge base
- **Community**: Hostinger user forums

## 🎯 Next Steps After Deployment

1. **Test all functionality thoroughly**
2. **Set up Google Analytics** (if needed)
3. **Configure email hosting** (if required)
4. **Set up backups** and monitoring
5. **Deploy your backend** to a separate server

---

**🎉 Congratulations! Your Agentflow frontend is now live on Hostinger!**
