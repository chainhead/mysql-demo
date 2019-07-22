# Install the application and its dependencies
cd ${APP_HOME}
npm i 
# Launch the API end-points
pm2 -n demo-1 -o $HOME/logs/demo-1.log -e $HOME/logs/demo-1.err start ${APP_HOME}/js/index.js -- $HOME/config/demo-1.json $HOME/config/mysql-connect.json $HOME/config/redis-connect.json
pm2 -n demo-2 -o $HOME/logs/demo-2.log -e $HOME/logs/demo-2.err start ${APP_HOME}/js/index.js -- $HOME/config/demo-2.json $HOME/config/mysql-connect.json $HOME/config/redis-connect.json 
pm2 -n demo-3 -o $HOME/logs/demo-3.log -e $HOME/logs/demo-3.err start ${APP_HOME}/js/index.js -- $HOME/config/demo-3.json $HOME/config/mysql-connect.json $HOME/config/redis-connect.json 
pm2 -n demo-4 -o $HOME/logs/demo-4.log -e $HOME/logs/demo-4.err start ${APP_HOME}/js/index.js -- $HOME/config/demo-4.json $HOME/config/mysql-connect.json $HOME/config/redis-connect.json 
pm2 logrotate
pm2 save