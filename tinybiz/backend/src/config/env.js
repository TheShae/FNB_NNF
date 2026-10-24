const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  databaseUrl: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/tinybiz',
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mockFnbEnabled: process.env.MOCK_FNB_ENABLED !== 'false',
  jwtSecret: process.env.JWT_SECRET || 'tinybiz_secret_key_12345',
};
