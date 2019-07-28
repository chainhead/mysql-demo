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
    - [Add MySQL back-end servers](#add-mysql-back-end-servers)
    - [Add MySQL monitor user and password](#add-mysql-monitor-user-and-password)
    - [Add MySQL users](#add-mysql-users)
    - [Commit](#commit)
  - [Data loading](#data-loading)
    - [Columns of CSV file](#columns-of-csv-file)
    - [Loading into database](#loading-into-database)
  - [Configuration - NodeJS](#configuration---nodejs)
  - [Launch](#launch)
  - [Logs](#logs)

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
cd /tmp
chmod 404 server.*
source $HOME/mysql-demo/sh/source.sh
cp server.pem ${PROJECT_HOME}/certs
cp server.key ${PROJECT_HOME}/certs
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

Launch the admin console to set-up ProxySQL.

```bash
mysql -u admin -p -h 127.0.0.1 -P6032
```

### Add MySQL back-end servers

```sql
INSERT INTO mysql_servers(hostgroup_id,hostname,port) VALUES (1,'127.0.0.1',3306);
```

### Add MySQL monitor user and password

- Change `password` below.

```sql
UPDATE global_variables SET variable_value='monitor' WHERE variable_name='mysql-monitor_username';
UPDATE global_variables SET variable_value='password' WHERE variable_name='mysql-monitor_password';
```

### Add MySQL users

- Change `password` below.

```sql
INSERT INTO mysql_users(username,password,default_hostgroup) VALUES ('demo1','password',1);
INSERT INTO mysql_users(username,password,default_hostgroup) VALUES ('demo2','password',1);
INSERT INTO mysql_users(username,password,default_hostgroup) VALUES ('demo3','password',1);
INSERT INTO mysql_users(username,password,default_hostgroup) VALUES ('demo4','password',1);
```

### Commit

```sql
LOAD MYSQL SERVERS TO RUNTIME;
SAVE MYSQL SERVERS TO DISK;
LOAD MYSQL VARIABLES TO RUNTIME;
SAVE MYSQL VARIABLES TO DISK;
LOAD MYSQL USERS TO RUNTIME;
SAVE MYSQL USERS TO DISK;
```

## Data loading

At this point, the API end-point is ready for launching. However, the database is empty. To populate the database, a CSV file with the following fields should be loaded into the database.

### Columns of CSV file

This database stores the details of various brokers registered with different stock exchanges. These details are stored in a CSV file with columns as listed below.

| Sl. No. | Column Name         | Description                                   | Type                       | Example                                                 |
| ------- | ------------------- | --------------------------------------------- | -------------------------- | ------------------------------------------------------- |
| 1       | Address             | Address of the organisation.                  | Free-form text             | #420, Premgali                                          |
| 2       | Checksum            | Data check value.                             | 32 hexa-decimal characters |                                                         |
| 3       | Delete flag         | _Ignore_                                      | Text                       |                                                         |
| 4       | Disbale flag        | _Ignore_                                      | Text                       |                                                         |
| 5       | E-mail              | E-mail address                                | Text (E-mail)              | somebody@somewhere.com                                  |
| 6       | Stock Exchange      | Name of exchange where registered             | Text                       | BSE                                                     |
| 7       | Facebook URL        | URL of Facebook page                          | Text (URL)                 | https://www.facebook.com/something                      |
| 8       | FAX                 | FAX number of the organisation                | Text (FAX number)          | +91 0000 000 000                                        |
| 9       | ID                  | Running serial number                         | Integer                    | 1                                                       |
| 10      | LinkedIn URL        | URL of LinkedIn page                          | Text (URL)                 | https://www.linkedin.com/something                      |
| 11      | Name                | Name of the organisation                      | Text                       | Stock Waala Ltd.                                        |
| 12      | Registration Number | 12 character registration number              | Text                       | AB123456789Z                                            |
| 13      | Source              | _Ignore_                                      | Text                       |                                                         |
| 14      | Telephone           | Telephone number                              | Text (Phone number)        | +91 0000 000 000                                        |
| 15      | Trade Name          | Name of trade                                 | Text                       | Stock waala                                             |
| 16      | Twitter URL         | URL of Twitter handle                         | Text (URL)                 | https://www.twitter.com/something                       |
| 17      | Type                | Type of organisation                          | Text                       | Finance                                                 |
| 18      | Validity            | From/To dates of validity                     | Date - Date                | Apr 20, 2014 - Apr 19, 2019 or Apr 20, 2010 - Perpetual |
| 19      | Website URL         | URL of website                                | Text (URL)                 | https://something.com/                                  |
| 20      | Validity From       | From date of validity (derived from Validity) | Date                       | 2014-04-20 00:00:00                                     |
| 21      | Validity To         | To date of validity (derived from Validity)   | Date                       | 2019-04-19 00:00:00 or 9999-12-31 00:00:00              |

### Loading into database

- Copy the file created with columns as described in the previous section to `/var/lib/mysql-files/`.
- Run command below to load into table.

```bash
mysql -u root -p
LOAD DATA INFILE '/var/lib/mysql-files/brokers.csv' IGNORE INTO TABLE BROKERS.BROKER_DETAILS FIELDS TERMINATED BY '|' ;
```

## Configuration - NodeJS

- Set environment variables with the command `source $HOME/mysql-demo/sh/source.sh`.
- Edit `${PROJECT_HOME}/conf/mysql-connect-*.json` to enter passwords as entered in `${PROJECT_HOME}/sql/install.sql`.

## Launch

Launch application using the command below.

```bash
$HOME/mysql-demo/sh/launch.sh
```

## Logs

- Request logs: `${PROJECT_HOME}/logs/access.log`
- API logs: `${PROJECT_HOME}/logs/demo-*.log` (Replace * with 1, 2, 3 or 4.)
