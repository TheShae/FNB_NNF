const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const env = require('../config/env');

async function runMigrations() {
  console.log('Connecting to PostgreSQL database at:', env.databaseUrl);

  // Connect to default postgres DB first to ensure target DB exists
  const baseUrl = env.databaseUrl.substring(0, env.databaseUrl.lastIndexOf('/'));
  const targetDb = env.databaseUrl.substring(env.databaseUrl.lastIndexOf('/') + 1);

  const initClient = new Client({ connectionString: `${baseUrl}/postgres` });
  try {
    await initClient.connect();
    const dbCheck = await initClient.query('SELECT 1 FROM pg_database WHERE datname = $1', [targetDb]);
    if (dbCheck.rows.length === 0) {
      console.log(`Creating database "${targetDb}"...`);
      await initClient.query(`CREATE DATABASE "${targetDb}";`);
    }
  } catch (err) {
    console.warn('Could not verify/create target database on root postgres connection:', err.message);
  } finally {
    await initClient.end().catch(() => {});
  }

  // Connect to target database
  const client = new Client({ connectionString: env.databaseUrl });
  try {
    await client.connect();
    console.log(`Connected to database "${targetDb}". Running SQL migrations...`);

    const migrationsDir = path.join(__dirname, '../../db/migrations');
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

    for (const file of files) {
      console.log(`Executing migration: ${file}`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      await client.query(sql);
    }

    const seedFile = path.join(__dirname, '../../db/seeds/demo_seed.sql');
    if (fs.existsSync(seedFile)) {
      console.log('Executing seed: demo_seed.sql');
      const seedSql = fs.readFileSync(seedFile, 'utf8');
      await client.query(seedSql);
    }

    console.log('✅ All migrations and seeds applied successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();
