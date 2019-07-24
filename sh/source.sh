### Environment variables and folder creation
##
#  1. Set-up environment variables
export PROJECT_HOME=$HOME/project-mysql-demo 
echo 'export PROJECT_HOME=$HOME/project-mysql-demo' >> .profile
#  2. Folders required for further configuration
mkdir ${PROJECT_HOME}
mkdir ${PROJECT_HOME}/logs
mkdir ${PROJECT_HOME}/conf
mkdir ${PROJECT_HOME}/sql
mkdir ${PROJECT_HOME}/etc
#
##  Set-up exports for use in later scripts
export PROJECT_SRC=$HOME/mysql-demo
export APP_SRC=${PROJECT_SRC}/app
echo 'export PROJECT_SRC=$HOME/mysql-demo' >> .profile
echo 'export APP_SRC=${PROJECT_SRC}/app' >> .profile
cp ${PROJECT_SRC}/cfg/* ${PROJECT_HOME}/conf
cp ${PROJECT_SRC}/sql/* ${PROJECT_HOME}/sql
