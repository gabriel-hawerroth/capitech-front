npm run build

ssh root@147.79.81.13 "pm2 delete ssr.capitech"

ssh root@147.79.81.13 "rm -rf /var/www/html/capitech/*"

scp -r dist/capitech-front/* root@147.79.81.13:/var/www/html/capitech/

ssh root@147.79.81.13 "/root/start_capitech.sh"
