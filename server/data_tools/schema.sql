-- AgentFlow SQL Schema
-- Use this file to import into phpMyAdmin on Hostinger

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'admin',
  avatar VARCHAR(255) DEFAULT '',
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Contact Submissions Table
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(100),
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_contacts_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Live Demo Requests Table
CREATE TABLE IF NOT EXISTS demos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  company VARCHAR(100),
  phone VARCHAR(20),
  industry VARCHAR(100),
  use_case TEXT,
  preferred_date DATE,
  preferred_time VARCHAR(20),
  status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_demos_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(30) DEFAULT '#6366F1',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Tags Table
CREATE TABLE IF NOT EXISTS tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image VARCHAR(255) DEFAULT '',
  gallery_images TEXT,
  category_id INT,
  author_name VARCHAR(100) DEFAULT 'AgentFlow AI',
  author_id INT,
  status ENUM('draft', 'published', 'scheduled') DEFAULT 'published',
  publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_time INT DEFAULT 5,
  views INT DEFAULT 0,
  is_featured TINYINT(1) DEFAULT 0,
  seo_title VARCHAR(255) DEFAULT '',
  seo_description TEXT,
  seo_keywords TEXT,
  canonical_url TEXT,
  og_image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_blogs_status_created (status, created_at),
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Blog Tags Junction Table
CREATE TABLE IF NOT EXISTS blog_tags (
  blog_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (blog_id, tag_id),
  FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Default Admin Accounts
INSERT INTO users (id, username, email, password, role, is_active) 
VALUES (1, 'admin', 'varmamanish341@gmail.com', '$2a$10$TnttoTThh6CG.6po9I8Ydeou2NhixKadm6ni2sg/OmsYX1JNfZKte', 'admin', 1)
ON DUPLICATE KEY UPDATE username=username;

INSERT INTO users (id, username, email, password, role, is_active) 
VALUES (2, 'sales_admin', 'sales@anvenssa.com', '$2a$10$2XCbqRlA2QdzsXVwgLvRbejWVgjC76av/WvWnPQuUGa.Hgd6xobsG', 'admin', 1)
ON DUPLICATE KEY UPDATE username=username;
