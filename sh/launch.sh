# Install the application and its dependencies
cd ${APP_SRC}
npm i 
## Launch the API end-points
pm2 -n demo-1 -o ${PROJECT_HOME}/logs/demo-1.log -e ${PROJECT_HOME}/logs/demo-1.err start ${APP_HOME}/js/index.js -- ${PROJECT_HOME}/config/demo-1.json ${PROJECT_HOME}/config/mysql-connect.json ${PROJECT_HOME}/config/redis-connect.json
pm2 -n demo-2 -o ${PROJECT_HOME}/logs/demo-2.log -e ${PROJECT_HOME}/logs/demo-2.err start ${APP_HOME}/js/index.js -- ${PROJECT_HOME}/config/demo-2.json ${PROJECT_HOME}/config/mysql-connect.json ${PROJECT_HOME}/config/redis-connect.json 
pm2 -n demo-3 -o ${PROJECT_HOME}/logs/demo-3.log -e ${PROJECT_HOME}/logs/demo-3.err start ${APP_HOME}/js/index.js -- ${PROJECT_HOME}/config/demo-3.json ${PROJECT_HOME}/config/mysql-connect.json ${PROJECT_HOME}/config/redis-connect.json 
pm2 -n demo-4 -o ${PROJECT_HOME}/logs/demo-4.log -e ${PROJECT_HOME}/logs/demo-4.err start ${APP_HOME}/js/index.js -- ${PROJECT_HOME}/config/demo-4.json ${PROJECT_HOME}/config/mysql-connect.json ${PROJECT_HOME}/config/redis-connect.json 
pm2 logrotate
pm2 save