module.exports = {
  apps: [
    {
      name: 'next',
      cwd: '.',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        DATABASE_URL: "mysql://adamg:zachwaterson09@localhost:3306/autoproc_db",
        JWT_SECRET: "sBxpyK0HWjI8rRaYsy+1eMXElDGmBbRLxB19UK6iAPQ=",
        NEXTAUTH_SECRET: "b9+36hJRyGMho2VrL45a9MkWdMU3ApwQv2duoleGHkg=",
        BCRYPT_SECRET: "cmx76FMP9kNtFko635Bu/wjQcRCi0odfCi4t6NqWiE8="
      },
    },
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
