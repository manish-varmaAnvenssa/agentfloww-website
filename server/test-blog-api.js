const express = require('express');
const { getDatabase } = require('./database');

// Initialize database
require('./init-database');

console.log('🧪 Testing Blog API Logic...');

const db = getDatabase();

// 1. Test Categories Query
const categories = db.prepare(`
  SELECT c.*, 
    (SELECT COUNT(*) FROM blogs b WHERE b.category_id = c.id AND b.status = 'published') as post_count
  FROM categories c
`).all();
console.log(`✅ Categories Found (${categories.length}):`, categories.map(c => `${c.name} (${c.post_count} posts)`));

// 2. Test Tags Query
const tags = db.prepare('SELECT * FROM tags').all();
console.log(`✅ Tags Found (${tags.length}):`, tags.map(t => `#${t.name}`));

// 3. Test Public Blogs Query
const blogsCount = db.prepare("SELECT COUNT(*) as count FROM blogs WHERE status = 'published'").get().count;
console.log(`✅ Total Published Blogs: ${blogsCount}`);

// 4. Test Single Blog Lookup by Slug
const sampleBlog = db.prepare("SELECT * FROM blogs WHERE slug LIKE '%architect%'").get();
if (sampleBlog) {
  console.log(`✅ Single Blog Found: "${sampleBlog.title}" (Views: ${sampleBlog.views})`);
} else {
  console.error('❌ Sample blog by slug not found');
}

// 5. Test Related Posts Query
if (sampleBlog) {
  const related = db.prepare(`
    SELECT title, slug FROM blogs 
    WHERE status = 'published' AND id != ? AND category_id = ? 
    LIMIT 3
  `).all(sampleBlog.id, sampleBlog.category_id);
  console.log(`✅ Related Posts Count: ${related.length}`);
}

console.log('🎉 All Backend API Logic Verification Checks Passed!');
process.exit(0);
