# Agentflow Website Platform

A modern AI company website built with React + Vite frontend and PHP backend, featuring contact management, live demo requests, and admin dashboard.

## 🚀 Features

- **Modern UI**: Professional design with Tailwind CSS and animations
- **Contact Management**: Integrated contact form with database storage
- **Live Demo System**: Demo request form with scheduling
- **Admin Dashboard**: Manage submissions with status tracking
- **Smart Message Display**: "View Full Message" for long content
- **Responsive Design**: Mobile-first approach
- **Simple Storage**: JSON file-based data storage (no database setup needed)

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: PHP 7.4+, JSON file storage
- **Database**: File-based storage (JSON files)
- **Deployment**: Static hosting + PHP support

## 📦 Quick Start

### 1. Install & Build
```bash
git clone <repository-url>
cd client
npm install
npm run build
```

### 2. Deploy
Upload to your web server:
- `dist/` folder contents
- `api.php` (PHP backend)

### 3. Admin Access
Navigate to `/admin` and login with:
- **Primary**: `varmamanish341@gmail.com` / `admin123`
- **Sales**: `sales@anvenssa.COM` / `A2mw0bdod#1`

## 🔧 API Endpoints

- `POST /api.php?action=contact` - Submit contact form
- `POST /api.php?action=demo` - Submit demo request
- `GET /api.php?action=contacts` - Get contacts (Admin)
- `GET /api.php?action=demos` - Get demo requests (Admin)

## 📁 Structure

```
agentflow-website/
├── client/          # React frontend
├── api.php          # PHP backend API
├── *.json           # Data storage files
└── README.md
```

## 🎯 Use Cases

Perfect for:
- AI service companies
- SaaS platforms
- Consulting firms
- Technology companies

## 🚀 Deployment

**Recommended**: Hostinger (PHP + static hosting)
**Alternative**: Any PHP-compatible hosting

## 🤝 Support

- **Email**: sales@anvenssa.com
- **Admin Panel**: `/admin` URL

---

Built with ❤️ by the Agentflow Team

*Empowering businesses with intelligent AI solutions* 