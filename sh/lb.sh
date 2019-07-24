#!/bin/bash
source $HOME/mysql-demo/sh/source.sh
## Nginx configuration
cp /etc/nginx/nginx.conf ${PROJECT_HOME}/conf/nginx.conf.backup
sudo cp ${PROJECT_SRC}/cfg/nginx.conf /etc/nginx/nginx.conf
sudo mkdir -p /data/nginx/cache
sudo nginx -s reload