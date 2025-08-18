# SQLite Database Setup Guide

## 🎯 **What We've Converted:**

✅ **MongoDB → SQLite** - 100% free, no limits, no server needed  
✅ **Kept Only Essential Models:**
- **Users** (Admin & Regular Users)
- **Contact Form Submissions**
- **Live Demo Requests**

## 🚀 **Quick Start:**

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Initialize Database
```bash
npm run init-db
```
This will:
- Create `./data/agentflow.db` file
- Create all necessary tables
- Add default admin user: `varmamanish341@gmail.com` / `admin123`

### 3. Start Server
```bash
npm start
```

## 💾 **Database Structure:**

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  avatar TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Contacts Table
```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(100),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Demos Table
```sql
CREATE TABLE demos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  company VARCHAR(100),
  phone VARCHAR(20),
  industry VARCHAR(100),
  use_case TEXT,
  preferred_date DATE,
  preferred_time VARCHAR(20),
  status VARCHAR(20) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 **API Endpoints:**

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get contact by ID
- `PATCH /api/contact/:id/status` - Update contact status
- `DELETE /api/contact/:id` - Delete contact

### Demo Requests
- `POST /api/demo` - Submit demo request
- `GET /api/demo` - Get all demo requests (admin)
- `GET /api/demo/:id` - Get demo by ID
- `PATCH /api/demo/:id/status` - Update demo status
- `DELETE /api/demo/:id` - Delete demo request

### Admin Panel
- `GET /api/admin/dashboard` - Admin dashboard stats
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

### User Management
- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile/:id` - Update user profile
- `PUT /api/users/profile/:id/password` - Change password

## 💡 **Benefits of SQLite:**

✅ **100% Free Forever** - No monthly costs  
✅ **No Server Setup** - File-based database  
✅ **No Network Issues** - Local database  
✅ **Easy Backup** - Just copy the .db file  
✅ **Fast Performance** - Optimized for small-medium apps  
✅ **Zero Configuration** - Works out of the box  

## 🚨 **Important Notes:**

1. **Database File**: Located at `./data/agentflow.db`
2. **Backup**: Copy this file to backup your data
3. **Port**: Server runs on port 5000 by default
4. **Admin User**: Created automatically during initialization
5. **No MongoDB**: All MongoDB dependencies removed

## 🔄 **Migration Complete!**

Your app now uses **SQLite** instead of **MongoDB**:
- ✅ No more MongoDB connection strings
- ✅ No more monthly database costs
- ✅ Simpler deployment (just copy files)
- ✅ Better performance for small-medium apps
- ✅ 100% free forever!

## 🆘 **Need Help?**

If you encounter any issues:
1. Check the console logs
2. Ensure `./data/` directory exists
3. Verify database file permissions
4. Restart the server after database changes
