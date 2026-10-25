const fs = require('fs');
const path = require('path');
const pool = require('../src/db/pool');

async function runMigrations() {
  console.log('🚀 Starting TinyBiz Database Migrations & Seeds...');

  const migrationsDir = path.join(__dirname, '../db/migrations');
  const seedFile = path.join(__dirname, '../db/seeds/demo_seed.sql');

  try {
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    const client = await pool.connect();
    try {
      for (const file of migrationFiles) {
        console.log(`Executing migration: ${file}`);
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        await client.query(sql);
      }

      if (fs.existsSync(seedFile)) {
        console.log('Executing demo seed data...');
        const seedSql = fs.readFileSync(seedFile, 'utf8');
        await client.query(seedSql);
      }

      console.log('✅ Database migrations and seeds applied successfully!');
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    console.log('\n💡 Tip: Ensure PostgreSQL is running on localhost:5432 with DATABASE_URL or database created:');
    console.log('   createdb -U postgres tinybiz   (or using Docker/Homebrew)');
  } finally {
    await pool.end();
  }
}

runMigrations();
