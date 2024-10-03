npm run build

ssh ubuntu@168.138.150.229 "pm2 delete ssr.capitech"

ssh ubuntu@168.138.150.229 "rm -rf /home/ubuntu/prd_projects/front/capitech/*"

scp -r dist/capitech-front/* ubuntu@168.138.150.229:/home/ubuntu/prd_projects/front/capitech/

ssh ubuntu@168.138.150.229 "/home/ubuntu/start_scripts/start_capitech.sh"
