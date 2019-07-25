# Introduction

This document describes the configuration files required for this project.

> **DO NOT EDIT ANY FILE IN THIS FOLDER.** The files in this folder are for reference only. They will be copied over to `$HOME/project-mysql-demo/conf` where all edits maybe done.

## Configuration files

There are two broad categories of configuration files as listed below.

- *Product configuration*. This set of files will configure the product(s) for use in this project.
- *Connection configuration*. This set of files define the parameters needed for connecting to the data stores.

Each set of configuration files is detailed below.

- *Product configuration*
  - Load balancing - `nginx.conf`
  - ProxySQL configuration - `proxysql.cfg`
  - NodeJS configuration - `demo-*.json`
- *Connection configuration*
  - MySQL connection - `mysql-connect.json`
  - Redis connection - `redis-connect.json`   (Currently, not used.)
