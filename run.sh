#!/bin/sh

yarn
npm run build
pm2 delete pr-starter3034

# staging
pm2 start --name "pr-starter3034" npm -- run startrbln
sudo cp nginx/pr-starter.synchronized.studio /etc/nginx/sites-available/pr-starter.synchronized.studio
sudo ln -s -f /etc/nginx/sites-available/pr-starter.synchronized.studio /etc/nginx/sites-enabled/

# sudo certbot --nginx -d herewith.com -d www.herewith.com

sudo nginx -t
sudo systemctl restart nginx
pm2 save
