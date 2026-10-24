const { Pool } = require('pg');
const env = require('../config/env');

const pool = new Pool({
  connectionString: env.databaseUrl,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  if (env.nodeEnv !== 'test') {
    console.error('Unexpected error on idle PostgreSQL client', err);
  }
});

module.exports = pool;
