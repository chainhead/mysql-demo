# Document

Change bind IP address to `0.0.0.0` to allow remote connections.

```python
python buildcsv.py ../json/SEBIEquityBrokers.json ../csv/SEBIEquityBrokers.csv ../csv/keys.csv
```

## Base installation

```bash
git clone
cd mysql-demo
./baseinstall.sh
```

## Server configuration

### Nginx

`../cfg/lb.cfg`

### NodeJS

`../cfg/demo-1.json`
`../cfg/demo-2.json`
`../cfg/demo-3.json`
`../cfg/demo-4.json`

### `pm2`

```bash
cd app
pm2 -n demo-1 -o ../../log/demo-1.log -e ../../log/demo-1.err start index.js -- ../../cfg/demo-1.json ../../cfg/mysql-connect.json ../../cfg/redis-connect.json
pm2 logrotate
pm2 save
```

### MySQL configuration

### MySQL table set-up

### `ProxySQL` set-up

### Redis configuration

## Application configuration

To convert JSON data into CSV for upload into tables, place the JSON file (`SEBIEquityBrokers.json`) into `json` folder and run the commands below.

### Data preparation

```bash
cd py
python buildcsv.py ../json/SEBIEquityBrokers.json ../csv/SEBIEquityBrokers.csv ../csv/keys.csv
```

### Data load
