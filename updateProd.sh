npm run build

ssh root@15.229.18.114 "pm2 delete ssr.capitech"

ssh root@15.229.18.114 "rm -rf /var/www/html/capitech/*"

scp -r dist/capitech-front/* root@15.229.18.114:/var/www/html/capitech/

ssh root@15.229.18.114 "/root/start_capitech.sh"