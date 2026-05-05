module.exports = {
  apps: [
    {
      name: "saf3001",
      script: "pm2 startOrReload ecosystem.config.js --env development",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "development"
      }
    }
  ],

  deploy: {
    staging: {
      user: "synchronized",
      host: "157.245.77.136",
      ssh_options: ["StrictHostKeyChecking=no", "PasswordAuthentication=no"],
      ref: "origin/master",
      repo: "git@bitbucket.org:rbln7/prismic-starter-template.git",
      path: "/home/synchronized/sites/prismic-starter-template/",
      "post-deploy": "npm install && npm run build && pm2 restart pr-starter3034"
    }
  }
}
