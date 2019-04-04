module.exports = {
  apps : [{
    name: 'APP_SGA',
    script: 'ionic',
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'serve --project sga ',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
