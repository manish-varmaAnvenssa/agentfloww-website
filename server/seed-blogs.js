const initDatabase = require('./init-database');
const path = require('path');

console.log('🌱 Starting Database Seeding for Blogs, Categories, and Tags...');

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

const seedData = async () => {
  // Ensure database setup initialized
  await initDatabase();
  
  const { getDatabase, db } = require('./database');

  // 1. Seed Categories
  const categories = [
    { name: 'AI & Automation', description: 'Deep dives into agentic AI, workflow orchestrations, and LLM implementations.', color: '#6366F1' },
    { name: 'Enterprise ERP', description: 'Integrating intelligence into core ERP, CRM, and financial accounting systems.', color: '#10B981' },
    { name: 'Productivity Insights', description: 'Actionable strategies for streamlining team operations and reducing manual overhead.', color: '#EC4899' },
    { name: 'Customer Experience', description: 'Creating hyper-personalized, 24/7 conversational customer touchpoints.', color: '#8B5CF6' },
    { name: 'Case Studies', description: 'Real-world customer success metrics, implementation benchmarks, and ROI breakdowns.', color: '#F59E0B' }
  ];

  const categoryIdMap = {};
  const insertCat = db.prepare('INSERT OR IGNORE INTO categories (name, slug, description, color) VALUES (?, ?, ?, ?)');
  
  for (const cat of categories) {
    const slug = slugify(cat.name);
    await insertCat.run(cat.name, slug, cat.description, cat.color);
    const saved = await db.prepare('SELECT id FROM categories WHERE slug = ?').get(slug);
    categoryIdMap[cat.name] = saved.id;
  }
  console.log('✅ Categories seeded!');

  // 2. Seed Tags
  const tags = ['AI Agents', 'Automation', 'ROI', 'ERP Integration', 'Workflow', 'Conversational AI', 'Sales Automation', 'Customer Support', 'Machine Learning'];
  const tagIdMap = {};
  const insertTag = db.prepare('INSERT OR IGNORE INTO tags (name, slug) VALUES (?, ?)');

  for (const tagName of tags) {
    const slug = slugify(tagName);
    await insertTag.run(tagName, slug);
    const saved = await db.prepare('SELECT id FROM tags WHERE slug = ?').get(slug);
    tagIdMap[tagName] = saved.id;
  }
  console.log('✅ Tags seeded!');

  // 3. Seed Sample Blogs
  const sampleBlogs = [
    {
      title: "The Architect's Guide to Building Autonomous AI Agents for Enterprise Workflows",
      excerpt: "Explore how multi-agent architectures process complex decision trees, automate cross-departmental operations, and reduce manual friction at scale.",
      featured_image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
      category_name: 'AI & Automation',
      tags: ['AI Agents', 'Automation', 'Workflow', 'Machine Learning'],
      read_time: 7,
      views: 1420,
      is_featured: 1,
      author_name: 'Dr. Evelyn Vance, Head of AI Research',
      seo_title: 'Building Autonomous AI Agents for Enterprise Workflows | AgentFlow',
      seo_description: 'Discover how multi-agent system architectures enable seamless automated enterprise operations without human bottlenecking.',
      seo_keywords: 'AI agents, enterprise automation, agentic workflows, artificial intelligence',
      content: `
<h2>The Shift from Reactive Automation to Agentic Intelligence</h2>
<p>Traditional robotic process automation (RPA) relied on rigid, rule-based scripts that broke the moment an edge case emerged. Modern enterprise demands a new paradigm: <strong>Agentic Workflows</strong> powered by autonomous LLM orchestrators that reason, plan, and execute multi-step business objectives.</p>

<p>In this architecture, autonomous AI agents function not merely as text completion tools, but as proactive decision engines capable of interacting with databases, internal web APIs, legacy ERP systems, and third-party SaaS environments.</p>

<blockquote>"Autonomous agents bridge the gap between static business rules and non-linear, unpredictable operational reality."</blockquote>

<h3>Core Architectural Layers of an Agentic System</h3>
<p>When engineering an enterprise-grade AI agent system, four foundational layers must be established:</p>

<ul>
  <li><strong>Perception & Ingestion Layer:</strong> Converts structured web hooks, unstructured emails, PDF invoices, and CRM events into normalized state tokens.</li>
  <li><strong>Cognitive Reasoning Engine:</strong> Employs tree-of-thought prompting and dynamic task decomposition to break high-level goals into granular action steps.</li>
  <li><strong>Tool Execution Bus:</strong> Safely triggers API endpoints, SQL queries, document generators, and notification webhooks with strict role-based access control (RBAC).</li>
  <li><strong>Memory & Context Store:</strong> Maintains short-term conversation state alongside vector-embedded long-term knowledge graphs.</li>
</ul>

<h3>Example Tool Calling Flow</h3>
<pre><code>// Example Agent Task Execution Node
const executeAgentTask = async (taskContext) => {
  const plan = await plannerModel.generatePlan(taskContext);
  for (const step of plan.steps) {
    const result = await toolExecutor.invoke(step.toolName, step.params);
    if (result.requiresApproval) {
      await humanInTheLoop.requestReview(step, result);
    }
  }
};</code></pre>

<h3>Key Implementation Metrics</h3>
<table>
  <thead>
    <tr>
      <th>Metric</th>
      <th>Legacy RPA</th>
      <th>AgentFlow AI Agents</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Edge Case Handling</td>
      <td>0% (Triggers Error)</td>
      <td>94.2% Autonomous Resolution</td>
    </tr>
    <tr>
      <td>Setup Time</td>
      <td>6 - 12 Weeks</td>
      <td>2 - 4 Days</td>
    </tr>
    <tr>
      <td>Maintenance Overhead</td>
      <td>High (Break on DOM change)</td>
      <td>Low (Self-healing selectors)</td>
    </tr>
  </tbody>
</table>

<p>By shifting to an agent-first infrastructure, enterprise teams reclaim thousands of hours of high-cognitive engineering capacity while guaranteeing SLA precision.</p>
      `
    },
    {
      title: "How Native ERP AI Automation Reduces Data Entry Cost by 85%",
      excerpt: "Uncover how direct ERP integration enables real-time document parsing, continuous reconciliation, and zero-latency financial operations.",
      featured_image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      category_name: 'Enterprise ERP',
      tags: ['ERP Integration', 'Automation', 'ROI'],
      read_time: 5,
      views: 980,
      is_featured: 1,
      author_name: 'Marcus Sterling, Chief Product Officer',
      seo_title: 'Native ERP AI Automation Strategy & Cost Reduction | AgentFlow',
      seo_description: 'Learn how connecting AI agents natively to enterprise ERP platforms dramatically slashes overhead and eliminates human data entry errors.',
      seo_keywords: 'ERP automation, financial AI, SAP integration, NetSuite AI, data entry reduction',
      content: `
<h2>The High Cost of Manual ERP Data Entry</h2>
<p>Enterprise Resource Planning (ERP) software is the backbone of global commerce. Yet, for decades, organizations have suffered from an unspoken tax: thousands of manual keystrokes required every day to sync invoices, POs, inventory logs, and customer records.</p>

<p>Manual data entry is not only expensive—it introduces human error rates averaging 1% to 3%, leading to costly inventory miscounts, delayed vendor payouts, and compliance audit headaches.</p>

<h3>The Solution: Deep Native ERP Integration</h3>
<p>AgentFlow connects directly at the database and API layer of major ERP solutions like SAP, Oracle NetSuite, Dynamics 365, and Tally. Instead of simple OCR scanning, AgentFlow agents comprehend document semantics, cross-verify line items with purchase orders, and post audit-ready journal entries automatically.</p>

<blockquote>"True ERP automation is zero-touch: from receipt ingestion to general ledger posting without a human touching a spreadsheet."</blockquote>

<h3>Realized Benefits & ROI Metrics</h3>
<ul>
  <li><strong>85% Reduction in Processing Cost:</strong> Average processing cost per invoice plummets from $12.50 to $0.45.</li>
  <li><strong>Instant Reconciliation:</strong> Sub-second verification against physical inventory databases.</li>
  <li><strong>Continuous Audit Trails:</strong> Every AI action is cryptographically logged with explicit timestamping and confidence scores.</li>
</ul>
      `
    },
    {
      title: "Maximizing ROI: Measuring the Real Impact of Intelligent Conversational Assistants",
      excerpt: "A data-driven methodology for measuring agent efficiency, resolution speed, and bottom-line impact in modern enterprise operations.",
      featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      category_name: 'Productivity Insights',
      tags: ['ROI', 'Conversational AI', 'Customer Support'],
      read_time: 6,
      views: 1120,
      is_featured: 1,
      author_name: 'Sarah Chen, VP of Customer Experience',
      seo_title: 'Measuring ROI of Conversational AI Assistants | AgentFlow Insights',
      seo_description: 'A comprehensive framework to calculate cost savings, conversion uplift, and customer satisfaction improvements from AI deployment.',
      seo_keywords: 'AI ROI, customer service automation, agent benchmarks, conversational AI metrics',
      content: `
<h2>Moving Beyond Superficial Metrics</h2>
<p>When evaluating AI deployment success, many organizations get trapped tracking vanity metrics like total messages processed or session counts. True business value lives in business outcomes: cost reduction, resolution acceleration, and revenue expansion.</p>

<h3>The Three Core ROI Pillars</h3>
<ol>
  <li><strong>Direct Operational Savings:</strong> Calculating deflected support ticket volume multiplied by average human cost-per-ticket.</li>
  <li><strong>Revenue Velocity & Conversion Uplift:</strong> Measuring how 24/7 instant response speeds impact lead-to-opportunity pipeline speed.</li>
  <li><strong>Employee Satisfaction (CSAT/eNPS):</strong> Freeing team members from repetitive triage so they can focus on high-value strategic clients.</li>
</ol>
      `
    },
    {
      title: "Designing Seamless Customer Journey Workflows with AI Sales & Support Agents",
      excerpt: "Construct intuitive, hyper-responsive customer funnels that convert visitors into buyers using contextual conversational AI.",
      featured_image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      category_name: 'Customer Experience',
      tags: ['Sales Automation', 'Customer Support', 'AI Agents'],
      read_time: 5,
      views: 760,
      is_featured: 0,
      author_name: 'David Reynolds, Solutions Architect',
      seo_title: 'Designing Seamless AI Customer Journeys | AgentFlow',
      seo_description: 'Learn how to blend AI sales qualification and customer support agents into a unified customer journey.',
      seo_keywords: 'customer journey AI, sales support automation, AI funnel',
      content: `
<h2>The Unified Sales & Service Experience</h2>
<p>Modern buyers expect instant, accurate answers whether they are asking about pricing at 2 AM or requesting technical documentation during business hours. Fragmented tools break the customer experience.</p>

<p>By unifying sales qualification agents with technical support assistants under a single context graph, your organization ensures zero context loss across buyer lifecycle stages.</p>
      `
    },
    {
      title: "Case Study: Scaling B2B Lead Conversion 4x Using Automated Quote Generation",
      excerpt: "How a global manufacturing leader implemented AI quote agents to issue complex custom pricing proposals in seconds instead of 4 days.",
      featured_image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
      category_name: 'Case Studies',
      tags: ['Sales Automation', 'ROI', 'ERP Integration'],
      read_time: 8,
      views: 890,
      is_featured: 0,
      author_name: 'Elena Rostova, Senior Case Study Lead',
      seo_title: 'B2B Lead Conversion Case Study | AgentFlow AI',
      seo_description: 'Read how automated quote generation reduced turnaround time from 4 days to 30 seconds, driving a 4x increase in conversion rate.',
      seo_keywords: 'B2B AI quote generation, CPQ automation, sales velocity case study',
      content: `
<h2>The Bottleneck in Custom B2B Sales</h2>
<p>In high-precision manufacturing, issuing a price quote required sales reps to query inventory levels, consult engineering specs, apply discount tiers, and format custom PDF proposals. The process took an average of 4 business days.</p>

<h3>The AgentFlow Intervention</h3>
<p>By implementing AgentFlow's AI Quote Generation Agent, sales teams can now ingest raw email inquiries, parse bill-of-materials requirements, run automated inventory validation against ERP databases, and output custom branded proposals within 30 seconds.</p>

<h3>Results at a Glance</h3>
<ul>
  <li><strong>Quote Delivery Time:</strong> Reduced from 96 hours to 30 seconds.</li>
  <li><strong>Win Rate Uplift:</strong> Increased by 312% due to first-responder advantage.</li>
  <li><strong>Margin Accuracy:</strong> 100% compliance with corporate pricing guidelines.</li>
</ul>
      `
    },
    {
      title: "The Future of Autonomous Workforces: Blending Human Ingenuity with AI Collaboration",
      excerpt: "Examining the hybrid operational model where human experts supervise autonomous AI fleets to achieve unprecedented enterprise speed.",
      featured_image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      category_name: 'Productivity Insights',
      tags: ['AI Agents', 'Automation', 'Workflow'],
      read_time: 6,
      views: 630,
      is_featured: 0,
      author_name: 'Alex Vance, Technology Strategist',
      seo_title: 'The Future of Autonomous Workforces & AI Collaboration | AgentFlow',
      seo_description: 'Explore human-in-the-loop architectures that maximize safety, control, and operational scale.',
      seo_keywords: 'autonomous workforce, human-in-the-loop AI, enterprise collaboration',
      content: `
<h2>Human-in-the-Loop Governance</h2>
<p>The future of work is not about replacing human decision-makers, but empowering them with an armada of digital co-pilots. By implementing Human-in-the-Loop (HITL) checkpoints for high-risk operations, enterprises maintain absolute control while operating at machine speed.</p>
      `
    }
  ];

  const stmt = db.prepare(`
    INSERT INTO blogs (
      title, slug, excerpt, content, featured_image,
      category_id, author_name, status, publish_date, read_time,
      views, is_featured, seo_title, seo_description, seo_keywords
    ) VALUES (
      ?, ?, ?, ?, ?,
      ?, ?, 'published', CURRENT_TIMESTAMP, ?,
      ?, ?, ?, ?, ?
    )
  `);

  for (const blog of sampleBlogs) {
    const slug = slugify(blog.title);

    // Check existing
    const existing = await db.prepare('SELECT id FROM blogs WHERE slug = ?').get(slug);
    let blogId;

    if (!existing) {
      const catId = categoryIdMap[blog.category_name] || null;
      const res = await stmt.run(
        blog.title,
        slug,
        blog.excerpt,
        blog.content,
        blog.featured_image,
        catId,
        blog.author_name,
        blog.read_time,
        blog.views,
        blog.is_featured,
        blog.seo_title,
        blog.seo_description,
        blog.seo_keywords
      );
      blogId = res.lastInsertRowid;
      console.log(`+ Created blog: "${blog.title}"`);
    } else {
      blogId = existing.id;
      console.log(`= Blog already exists: "${blog.title}"`);
    }

    // Attach tags
    if (blog.tags && Array.isArray(blog.tags)) {
      for (const tagName of blog.tags) {
        const tId = tagIdMap[tagName];
        if (tId) {
          await db.prepare('INSERT OR IGNORE INTO blog_tags (blog_id, tag_id) VALUES (?, ?)').run(blogId, tId);
        }
      }
    }
  }

  console.log('🎉 Database seeding completed successfully!');
  await db.close();
};

if (require.main === module) {
  seedData()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Seeding failed:', err);
      process.exit(1);
    });
}

module.exports = seedData;
