#
export PROJECT_HOME=$HOME/mysql-demo
export APP_HOME=${PROJECT_HOME}/app
#
echo 'export PROJECT_HOME=$HOME/mysql-demo' >> .profile
echo 'export APP_HOME=${PROJECT_HOME}/app' >> .profile
##
mkdir $HOME/logs
mkdir $HOME/config
cp ${PROJECT_HOME}/cfg/* $HOME/config/
##
cp /etc/nginx/nginx.conf $HOME/config/nginx.conf.backup
sudo cp ${PROJECT_HOME}/cfg/nginx.conf /etc/nginx/nginx.conf
sudo mkdir -p /data/nginx/cache
sudo nginx -s reload
##
cd ${APP_HOME}
npm i 
##
