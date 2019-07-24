#!/bin/bash
### Environment variables
##
#  1. Set-up environment variables
export PROJECT_HOME=$HOME/project-mysql-demo 
echo 'export PROJECT_HOME=$HOME/project-mysql-demo' >> .profile
#
##  Exports for use in later scripts
export PROJECT_SRC=$HOME/mysql-demo
export APP_SRC=${PROJECT_SRC}/app
echo 'export PROJECT_SRC=$HOME/mysql-demo' >> .profile
echo 'export APP_SRC=${PROJECT_SRC}/app' >> .profile