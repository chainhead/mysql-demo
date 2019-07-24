# Introduction

This document describes the installation procedure for this project.

- [Introduction](#introduction)
  - [Installation](#installation)
  - [SSL termination for Nginx](#ssl-termination-for-nginx)
    - [Key generation](#key-generation)
    - [Setting up Nginx configuration](#setting-up-nginx-configuration)
  - [Configuration - Nginx](#configuration---nginx)
  - [Configuration - MySQL](#configuration---mysql)
  - [Configuration - ProxySQL](#configuration---proxysql)
  - [Configuration - Redis](#configuration---redis)
  - [Configuration - NodeJS](#configuration---nodejs)
  - [Data loading](#data-loading)
    - [Columns of CSV file](#columns-of-csv-file)
    - [Data generation](#data-generation)
    - [Loading into database](#loading-into-database)
  - [Launch](#launch)

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
- Post installation, do basic configuration.

```bash
git clone https://github.com/chainhead/mysql-demo.git
$HOME/mysql-demo/sh/install.sh
$HOME/mysql-demo/sh/config.sh
```

## SSL termination for Nginx

Since this project is just a demonstration, we will be using self-signed certificates that will be supported in Nginx. Once generated, they will be copied over to a folder for Nginx to access.

### Key generation

Using the commands below, a self-signed certificate can be created.

> In production systems, self-signed certificates should *NOT* be used.

```bash
cd /tmp
openssl req -newkey rsa:2048 -new -nodes -keyout server.pem -out csr.pem
openssl x509 -req -days 365 -in csr.pem -signkey server.pem -out server.crt
```

### Setting up Nginx configuration

Copy the certificates to a folder that Nginx can access.

```bash
source $HOME/mysql-demo/sh/source.sh
cp server.pen ${PROJECT_HOME}/certs
cp server.key ${PROJECT_HOME}/certs
chmod 404 server.*
```

## Configuration - Nginx

Configure Nginx by running the commands below. This command will:

- Listen at port `443` for TLS encrypted traffic
- Terminate encrypted data and forward decrypted data to upstream servers
- Load balance across four upstream instances of NodeJS

```bash
$HOME/mysql-demo/sh/lb.sh
```

## Configuration - MySQL

Create database and tables for this project using the steps below.

- Set environment variables with the command `source $HOME/mysql-demo/sh/source.sh`.
- Edit `${PROJECT_HOME}/sql/install.sql` to change passwords.
- Run the command below. Enter root password as provided during installation of MySQL.

```bash
mysql -u root -p < ${PROJECT_HOME}/sql/install.sql
```

## Configuration - ProxySQL

Set-up communication with MySQL back-end configured above.

- Set environment variables with the command `source $HOME/mysql-demo/sh/source.sh`.
- Edit `${PROJECT_HOME}/conf/proxysql.conf` to change passwords as entered in `${PROJECT_HOME}/sql/install.sql`.
- Run the command below.

```bash
$HOME/mysql-demo/sh/proxy.sh
```

## Configuration - Redis

TBD

## Configuration - NodeJS

- Set environment variables with the command `source $HOME/mysql-demo/sh/source.sh`.
- Edit `${PROJECT_HOME}/conf/mysql-connect-*.json` to enter passwords as entered in `${PROJECT_HOME}/sql/install.sql`.

## Data loading

At this point, the API end-point is ready for launching. However, the database is empty. To populate the database, a CSV file with the following fields should be loaded into the database.

### Columns of CSV file

This database stores the details of various brokers registered with different stock exchanges.

### Data generation

### Loading into database

## Launch

```bash
$HOME/mysql-demo/sh/launch.sh
```
