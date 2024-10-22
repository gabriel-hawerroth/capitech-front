npm run build

ssh ubuntu@hawetec "pm2 delete ssr.capitech"

ssh ubuntu@hawetec "rm -rf /home/ubuntu/prd_projects/front/capitech/*"

scp -r dist/capitech-front/* ubuntu@hawetec:/home/ubuntu/prd_projects/front/capitech/

ssh ubuntu@hawetec "/home/ubuntu/start_scripts/start_capitech.sh"
