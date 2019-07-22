### OS Management
##
# Update and upgrade distribution
sudo apt-get update
sudo apt-get -y upgrade
##
# Update time zone to IST
sudo timedatectl set-timezone Asia/Kolkata
# Install bench marking tool
sudo apt install -y sysbench
### Products installation
## NGINX
sudo apt install -y nginx 
## NodeJS
#  1. Download setup script
cd /tmp
curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
#  2. Refresh package cache
sudo bash nodesource_setup.sh
#  3. Install NodeJS
sudo apt-get install -y nodejs 
#  4. Install pre-requsites that maybe required for some packages
sudo apt install -y build-essential
##
## NPM installations
npm i pm2 -g 
pm2 install pm2-logrotate
##
## MySQL
# Download .deb package
#  This installation will use the .deb file from the MySQL website. 
#  It does not use the APT repository because, it may be a few releases behind. 
#  At the time of writing this script, the MySQL version is 8. 
#  The .deb file URL is derived from this URL https://dev.mysql.com/downloads/file/?id=487007
# 
#  1. Download the .deb file
cd /tmp
curl -OL https://dev.mysql.com/get/mysql-apt-config_0.8.13-1_all.deb
#  2. Install the .deb file
#     - Scroll down to the last option (ok) and hit Enter
sudo dpkg -i mysql-apt-config_0.8.13-1_all.deb
#  3. Refresh apt repository
sudo apt update
#  4. Install MySQL server
#     - Enter root password - Root.Password
#     - Use Legacy Authentication method
sudo apt install -y mysql-server
#     - Often, the next step is to enable password validation plugin. If required, the following command maybe run.
# sudo mysql_secure_installation
#  5. Check install status
sudo systemctl status mysql.service
##
## MySQL proxy
# 1. Download latest .deb from here https://github.com/sysown/proxysql/releases/tag/v2.0.5
cd /tmp
curl -OL https://github.com/sysown/proxysql/releases/download/v2.0.5/proxysql_2.0.5-clickhouse-ubuntu18_amd64.deb
# 2. Install the package
sudo dpkg -i proxysql_2.0.5-clickhouse-ubuntu18_amd64.deb
# 3. Start service
sudo service proxysql start
cd 
##
## Redis
sudo apt install -y redis-server
sudo systemctl restart redis.service
##
