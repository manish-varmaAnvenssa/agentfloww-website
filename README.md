# Anvenssa Website Platform

A modern, full-stack company website platform built with Vite + React frontend and Node.js + MongoDB backend, featuring blog management, newsroom, contact forms, and admin dashboard.

## 🚀 Features

### Frontend (React + Vite)
- **Modern UI Design**: Stripe-inspired design with smooth animations
- **Responsive Layout**: Mobile-first design with Tailwind CSS
- **Blog System**: Public blog with categories, tags, and search
- **Newsroom**: Company news and press releases
- **Contact Form**: Integrated contact form with database storage
- **Admin Dashboard**: Role-based access control
- **Authentication**: JWT-based authentication system

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Complete API for all features
- **User Management**: Role-based user system (Admin, Blogger, Newsroom)
- **Content Management**: Blog and news article management
- **Contact Management**: Contact form submissions with database storage
- **Security**: JWT authentication, password hashing, rate limiting
- **Database**: MongoDB with Mongoose ODM

### User Roles
- **Admin**: Full access to all features and user management
- **Blogger**: Create and manage blog posts
- **Newsroom**: Create and manage news articles

### Access Control
- **Admin-only access**: No public signup available
- **URL-based admin access**: Admin panel accessible only via `/admin` URL
- **Protected routes**: All admin pages require authentication
- **Backend management**: Users must be created directly in the database or through admin panel
- **Secure authentication**: JWT-based login system for authorized users only

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- React Query
- React Hook Form
- Framer Motion
- Tailwind CSS
- Lucide React Icons
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

- Express Validator
- Helmet
- CORS

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd anvenssa-website
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install all dependencies (frontend + backend)
npm run install-all
```

### 3. Environment Setup

#### Backend Environment
Create a `.env` file in the `server` directory:
```bash
cd server
cp env.example .env
```

Edit the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/anvenssa
JWT_SECRET=your-super-secret-jwt-key-here
CLIENT_URL=http://localhost:5173
```

#### Frontend Environment
The frontend is configured to proxy API requests to the backend automatically.

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Start MongoDB (if using local installation)
mongod
```

### 5. Create Admin User
Since there's no public signup, you need to create an admin user first:

```bash
# Navigate to server directory
cd server

# Create admin user (default: admin@anvenssa.com / admin123)
npm run create-admin
```

### 6. Run the application

#### Development Mode
```bash
# Run both frontend and backend
npm run dev
```

### 7. Access Admin Panel

To access the admin panel:
1. Go to `http://localhost:5173/admin` in your browser
2. You'll be redirected to the admin login page
3. Use the credentials created in step 5
4. After login, you'll be redirected to the admin dashboard

**Note**: The admin panel is only accessible via the `/admin` URL. There are no visible login links on the public website.

#### Production Mode
```bash
# Build frontend
npm run build

# Start production server
npm start
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
anvenssa-website/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Backend (Node.js + Express)
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── index.js            # Server entry point
│   └── package.json
├── package.json            # Root package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Blogs
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/:slug` - Get single blog by slug
- `POST /api/blogs` - Create new blog (Admin/Blogger)
- `PUT /api/blogs/:id` - Update blog (Admin/Blogger)
- `DELETE /api/blogs/:id` - Delete blog (Admin/Blogger)

### News
- `GET /api/news` - Get all published news
- `GET /api/news/:slug` - Get single news by slug
- `POST /api/news` - Create new news (Admin/Newsroom)
- `PUT /api/news/:id` - Update news (Admin/Newsroom)
- `DELETE /api/news/:id` - Delete news (Admin/Newsroom)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (Admin)
- `PUT /api/contact/:id` - Update contact status (Admin)

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `POST /api/admin/users` - Create new user (Admin)
- `GET /api/admin/users` - Get all users (Admin)
- `PUT /api/admin/users/:id` - Update user (Admin)
- `DELETE /api/admin/users/:id` - Delete user (Admin)

## 👥 User Management

### Creating Users
Users must be created directly in the database or through the admin panel. No public signup is available.

#### Method 1: Direct Database Creation
1. Connect to your MongoDB database
2. Create a new user document in the `users` collection:
```javascript
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "hashedPassword", // Use bcrypt to hash the password
  "role": "admin",
  "isActive": true
}
```

#### Method 2: Admin Panel (if available)
1. Login with an existing admin account
2. Navigate to the Users section in the admin panel
3. Create new users through the interface

### Default Admin Account
You should create an admin account directly in the database before first use.

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize:
- Colors in `client/tailwind.config.js`
- Components in `client/src/index.css`
- Global styles in the same file

### Content
- Update company information in components
- Modify contact details in `client/src/pages/Contact.jsx`
- Change hero content in `client/src/pages/Home.jsx`

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection
- Helmet security headers



## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

### Backend Deployment
The backend can be deployed to:
- Heroku
- DigitalOcean
- AWS EC2
- Railway

### Environment Variables
Make sure to update all environment variables for production deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: contact@anvenssa.com

## 🔄 Updates

Stay updated with the latest features and improvements by:
- Following the repository
- Checking the releases page
- Reading the changelog

---

Built with ❤️ by Anvenssa Team 