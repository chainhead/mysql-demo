# Document

## Installation

- The following products will be installed:
  - Nginx
  - NodeJs and required `npm` packages
  - MySQL
  - ProxySQL
- The installation of MySQL is interactive and the following needs to be input when installing.
  - Configuring `mysql-apt-config`. Scroll down to last option and hit `Enter`.
  - Root password. Enter a strong password and note it down somewhere safe. It will be required again.
  - Configuring `mysql-community-server`. Select the option for strong password encryption.
- Begin installation by running the commands shown below.
- Post installation, do basic configuration

```bash
git clone https://github.com/chainhead/mysql-demo.git
$HOME/mysql-demo/sh/install.sh
$HOME/mysql-demo/sh/config.sh
```

## SSL termination for Nginx

- Upload certificates for Nginx to support SSL termination.
- Create the public key with name as `server.crt`.
- Create its private key with name as `server.key`.
- Copy them to `${PROJECT_HOME}/certs`.
- Set permissions of the files as `chmod 404 server.*`.

### Key generation

Using the commands below, a self-signed certificate can be created. However, in production systems, self-signed certificates should *NOT* be used.

```bash
openssl req -newkey rsa:2048 -new -nodes -keyout server.pem -out csr.pem
openssl x509 -req -days 365 -in csr.pem -signkey server.pem -out server.crt
chmod 404 server.*
```

## Configuration - Nginx

- Configure Nginx by running the commands below.

```bash
$HOME/mysql-demo/sh/lb.sh
```

## Configuration - MySQL

- Set environment variables with the command `source $HOME/mysql-demo/sh/source.sh`.
- Edit `${PROJECT_HOME}/sql/install.sql` to change passwords.
- Run the command below. Enter root password as provided during installation of MySQL.

```bash
mysql -u root -p < ${PROJECT_HOME}/sql/install.sql
```

## Configuration - ProxySQL

- Set environment variables with the command `source $HOME/mysql-demo/sh/source.sh`.
- Edit `${PROJECT_HOME}/conf/proxysql.conf` to change passwords as entered in `${PROJECT_HOME}/sql/install.sql`.

```bash
$HOME/mysql-demo/sh/proxy.sh
```

## Configuration - Redis

## Configuration - NodeJS

- Set environment variables with the command `source $HOME/mysql-demo/sh/source.sh`.
- Edit `${PROJECT_HOME}/conf/mysql-connect-*.json` to enter passwords as entered in `${PROJECT_HOME}/sql/install.sql`.

## Launch

```bash
$HOME/mysql-demo/sh/launch.sh
```
