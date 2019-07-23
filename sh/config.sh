#
##  Set-up exports for use in later scripts
export PROJECT_HOME=$HOME/project-mysql-demo
export PROJECT_SRC=$HOME/mysql-demo
export APP_SRC=${PROJECT_SRC}/app
echo 'export PROJECT_SRC=$HOME/mysql-demo' >> .profile
echo 'export APP_SRC=${PROJECT_SRC}/app' >> .profile
cp ${PROJECT_SRC}/cfg/* ${PROJECT_HOME}/conf
cp ${PROJECT_SRC}/sql/* ${PROJECT_HOME}/sql
## Nginx configuration
cp /etc/nginx/nginx.conf ${PROJECT_HOME}/conf/nginx.conf.backup
sudo cp ${PROJECT_SRC}/cfg/nginx.conf /etc/nginx/nginx.conf
sudo mkdir -p /data/nginx/cache
sudo nginx -s reload