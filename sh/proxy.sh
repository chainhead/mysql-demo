#!/bin/bash
source $HOME/mysql-demo/sh/source.sh
# ProxySQL configuration
sudo cp /etc/proxysql.cnf ${PROJECT_HOME}/conf/proxysql.cnf.backup
sudo cp ${PROJECT_HOME}/conf/proxysql.conf /etc/proxysql.cnf
sudo proxysql service restart
