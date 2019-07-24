#!/bin/bash
source $HOME/mysql-demo/sh/source.sh
# Install the application and its dependencies
cd ${APP_SRC}
npm i 
## Launch the API end-points
pm2 -n demo-1 -o ${PROJECT_HOME}/logs/demo-1.log -e ${PROJECT_HOME}/logs/demo-1.err start ${APP_SRC}/js/index.js -- ${PROJECT_HOME}/conf/demo-1.json ${PROJECT_HOME}/conf/mysql-connect-1.json ${PROJECT_HOME}/conf/redis-connect.json
pm2 -n demo-2 -o ${PROJECT_HOME}/logs/demo-2.log -e ${PROJECT_HOME}/logs/demo-2.err start ${APP_SRC}/js/index.js -- ${PROJECT_HOME}/conf/demo-2.json ${PROJECT_HOME}/conf/mysql-connect-2.json ${PROJECT_HOME}/conf/redis-connect.json 
pm2 -n demo-3 -o ${PROJECT_HOME}/logs/demo-3.log -e ${PROJECT_HOME}/logs/demo-3.err start ${APP_SRC}/js/index.js -- ${PROJECT_HOME}/conf/demo-3.json ${PROJECT_HOME}/conf/mysql-connect-3.json ${PROJECT_HOME}/conf/redis-connect.json 
pm2 -n demo-4 -o ${PROJECT_HOME}/logs/demo-4.log -e ${PROJECT_HOME}/logs/demo-4.err start ${APP_SRC}/js/index.js -- ${PROJECT_HOME}/conf/demo-4.json ${PROJECT_HOME}/conf/mysql-connect-4.json ${PROJECT_HOME}/conf/redis-connect.json 
pm2 logrotate
pm2 save