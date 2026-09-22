const { getDatabase } = require('./database');
const path = require('path');
const fs = require('fs');

console.log('🌱 Seeding Contacts and Demo Requests...');

const sampleContacts = [
  {
    name: 'Sarah Jenkins',
    email: 'sarah.j@globalenterprises.com',
    phone: '+1 415-555-0182',
    company: 'Global Enterprises Inc.',
    message: 'We are looking to automate our SAP purchase order approval workflows using AgentFlow autonomous agents. Please connect us with a solutions architect.',
    status: 'new',
    created_at: '2026-07-28 14:30:00'
  },
  {
    name: 'David Chen',
    email: 'dchen@innovatecorp.io',
    phone: '+1 650-555-0199',
    company: 'Innovate Analytics',
    message: 'Interested in evaluating AgentFlow for our supply chain tracking and inventory reconciliation across 4 regional warehouses.',
    status: 'read',
    created_at: '2026-07-27 09:15:00'
  },
  {
    name: 'Marcus Vance',
    email: 'marcus.vance@techminds.org',
    phone: '+1 312-555-0147',
    company: 'TechMinds Solutions',
    message: 'We want to inquire about custom enterprise SLAs and private cloud VPC deployment options for financial compliance audit agent loops.',
    status: 'replied',
    created_at: '2026-07-26 16:45:00'
  }
];

const sampleDemos = [
  {
    name: 'Michael Ross',
    email: 'm.ross@apexlogistics.com',
    company: 'Apex Logistics Ltd',
    phone: '+1 212-555-0144',
    industry: 'Supply Chain & Logistics',
    use_case: 'Automating customs documentation extraction and ERP ledger posting.',
    preferred_date: '2026-08-05',
    preferred_time: '10:00 AM EST',
    status: 'confirmed',
    notes: 'Scheduled 45-min technical architecture demo with Solutions Architect.',
    created_at: '2026-07-29 11:20:00'
  },
  {
    name: 'Elena Rostova',
    email: 'elena@fintechsolutions.co',
    company: 'Fintech Solutions',
    phone: '+44 20 7946 0912',
    industry: 'Financial Services',
    use_case: 'Accounts payable invoice verification with human-in-the-loop audit approvals.',
    preferred_date: '2026-08-08',
    preferred_time: '02:30 PM GMT',
    status: 'pending',
    notes: 'Requested security whitepaper prior to demo call.',
    created_at: '2026-07-29 13:45:00'
  },
  {
    name: 'Robert Sterling',
    email: 'r.sterling@sterlingmfg.com',
    company: 'Sterling Manufacturing',
    phone: '+1 313-555-0188',
    industry: 'Manufacturing',
    use_case: 'Real-time raw material inventory sync and automated Purchase Requisition writebacks to Oracle NetSuite.',
    preferred_date: '2026-08-10',
    preferred_time: '11:00 AM CST',
    status: 'pending',
    notes: 'Needs demo focused on NetSuite OData API writebacks.',
    created_at: '2026-07-28 15:10:00'
  }
];

(async () => {
  const db = getDatabase();
  
  // Seed Database
  try {
    const existingContactsRow = await db.prepare('SELECT COUNT(*) as count FROM contacts').get();
    const existingContacts = existingContactsRow ? existingContactsRow.count : 0;
    
    if (existingContacts === 0) {
      const insertContact = db.prepare(`
        INSERT INTO contacts (name, email, phone, company, message, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      for (const c of sampleContacts) {
        await insertContact.run(c.name, c.email, c.phone, c.company, c.message, c.status, c.created_at);
      }
      console.log(`✅ Seeded ${sampleContacts.length} sample contacts into database.`);
    } else {
      console.log(`ℹ️ Contacts table already has ${existingContacts} records.`);
    }

    const existingDemosRow = await db.prepare('SELECT COUNT(*) as count FROM demos').get();
    const existingDemos = existingDemosRow ? existingDemosRow.count : 0;
    
    if (existingDemos === 0) {
      const insertDemo = db.prepare(`
        INSERT INTO demos (name, email, company, phone, industry, use_case, preferred_date, preferred_time, status, notes, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      for (const d of sampleDemos) {
        await insertDemo.run(d.name, d.email, d.company, d.phone, d.industry, d.use_case, d.preferred_date, d.preferred_time, d.status, d.notes, d.created_at);
      }
      console.log(`✅ Seeded ${sampleDemos.length} sample demo requests into database.`);
    } else {
      console.log(`ℹ️ Demos table already has ${existingDemos} records.`);
    }
  } catch (err) {
    console.error('MySQL seeding error:', err);
  }

  // Seed JSON files in client directory for PHP production environment compatibility
  try {
    const clientDir = path.join(__dirname, '..', 'client');
    const contactsJsonPath = path.join(clientDir, 'contacts.json');
    const demosJsonPath = path.join(clientDir, 'demos.json');

    if (!fs.existsSync(contactsJsonPath) || fs.readFileSync(contactsJsonPath, 'utf8').trim() === '[]') {
      const formattedContacts = sampleContacts.map((c, i) => ({ id: 1740000000 + i, ...c }));
      fs.writeFileSync(contactsJsonPath, JSON.stringify(formattedContacts, null, 2));
      console.log('✅ Created client/contacts.json file for production PHP support.');
    }

    if (!fs.existsSync(demosJsonPath) || fs.readFileSync(demosJsonPath, 'utf8').trim() === '[]') {
      const formattedDemos = sampleDemos.map((d, i) => ({ id: 1740000100 + i, ...d }));
      fs.writeFileSync(demosJsonPath, JSON.stringify(formattedDemos, null, 2));
      console.log('✅ Created client/demos.json file for production PHP support.');
    }
  } catch (err) {
    console.error('JSON file seeding error:', err);
  }

  await db.close();
  console.log('🎉 Contact & Demo Seeding Complete!');
  process.exit(0);
})().catch(err => {
  console.error('Fatal seeding error:', err);
  process.exit(1);
});
