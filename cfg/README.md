# Introduction

This document describes the configuration files required for this project. **DO NOT EDIT ANY FILE IN THIS FOLDER.**

## Configuration files

There are two broad categories of configuration files as listed below.

- *Product configuration*. This set of files will configure the product(s) for use in this project.
- *Connection configuration*. This set of files define the parameters needed for connecting to the data stores.

Each set of configuration files is detailed below.

- *Product configuration*
  - Load balancing - `nginx.conf`
  - MySQL configuration - `msysql-config.json`
  - Redis configuration - `redis-config.json`
  - NodeJS configuration - `demo-*.json`
- *Connection configuration*
  - MySQL connection - `mysql-connect.json`
  - Redis connection - `redis-connect.json`

## Set-up configuration

- Create a folder for storing the configuration files _outside_ this project e.g. `$HOME/config`. Note this folder name as we will be referring this again.

```bash
cd $HOME
mkdir config
```

- Copy all the configuration files to this folder for editing.

```bash
cd $HOME/config
cp $HOME/mysql-demo/cfg/*.* $HOME/config
```

## Editing the configuration

To minimize the changes in configuration, only the following files need to be changed.

### MySQL connection

- Edit the `password` field in the `mysql-connect.json` file to the same value as set in the `CREATE USER` DDL in the `sql/install.sql` file.

### Redis connection

- Edit the `password` field in the `redis-connect.json` file to the same value as set in the ...
