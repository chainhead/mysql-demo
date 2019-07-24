#!/bin/bash
source $HOME/mysql-demo/sh/source.sh
#
mkdir ${PROJECT_HOME}
mkdir ${PROJECT_HOME}/logs
mkdir ${PROJECT_HOME}/conf
mkdir ${PROJECT_HOME}/sql
mkdir ${PROJECT_HOME}/etc
#
cp ${PROJECT_SRC}/cfg/* ${PROJECT_HOME}/conf
cp ${PROJECT_SRC}/sql/* ${PROJECT_HOME}/sql