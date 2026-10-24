const app = require('./app');
const env = require('./config/env');

app.listen(env.port, () => {
  console.log(`TinyBiz Express Backend running on port ${env.port} (${env.nodeEnv})`);
});
