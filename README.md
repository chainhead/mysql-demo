# mysql-demo

Demo of a simple NodeJS API querying a MySQL back-end

## Introduction

This project demonstrates a NodeJS API querying a MySQL database. This project can be deployed on to an on-premises set-up or hosted on a VM on cloud.

## Solution components

The following diagram illustrates the components of this solution. The complete solution is hosted on a Ubuntu 18.04 LTS `t2.meduim` virtual machine provisioned on AWS.

![On-premise set-up](png/on-prem.png)

- HTTPS end-point, load balancer, reverse proxy and API caching supprt for NodeJS application instances
- Proxy server for MySQL database
- MySQL database
- API in NodeJS

## Installation

To get started, head to [project documentation](doc/README.md).

## API documentation

The APIs are documented are as follows.

### Get registration numbers

- Server: `https://host`

#### Request

| Verb  | Endpoint   | Parameters | Body |
| ----- | ---------- | ---------- | ---- |
| `GET` | `/regnums` | None       | None |

#### Response

| Code  | Description                                 | Type               |
| ----- | ------------------------------------------- | ------------------ |
| `200` | Broker details for all registration numbers | `application/json` |

Example

```json
{
    "r" : [
            {
                "REGISTRATION_NUM": "Registration Number",
                "BROKER_NAME": "AAA CAPITAL SERVICES PRIVATE LIMITED",
                "BROKER_TYPE": "finance",
                "TRADE_NAME": "AAAA CAPITAL SERVICES PRIVATE LIMITED",
                "EXCHANGE_NAME": "BOMBAY STOCK EXCHANGE LIMITED",
                "EMAIL_ADDRESS": "AAA@cal2.vsnl.net.in",
                "BROKER_ADDRESS": "Calcutta"
            },
            {
                "REGISTRATION_NUM": "Registration Number",
                "BROKER_NAME": "BBB CAPITAL SERVICES PRIVATE LIMITED",
                "BROKER_TYPE": "finance",
                "TRADE_NAME": "BBBBB CAPITAL SERVICES PRIVATE LIMITED",
                "EXCHANGE_NAME": "BOMBAY STOCK EXCHANGE LIMITED",
                "EMAIL_ADDRESS": "BBB@cal2.vsnl.net.in",
                "BROKER_ADDRESS": "Bombay"
            }
    ]
}
```

### Get broker details by registration number

- Server: `https://host`

#### Request

| Verb  | Endpoint   | Parameters          | Body |
| ----- | ---------- | ------------------- | ---- |
| `GET` | `/regnum/` | Registration number | None |

#### Response

| Code  | Description                                 | Type               |
| ----- | ------------------------------------------- | ------------------ |
| `200` | Broker details for all registration numbers | `application/json` |

Example

```json
{
    "r" :  {
            "REGISTRATION_NUM": "Registration Number",
            "BROKER_NAME": "AAA CAPITAL SERVICES PRIVATE LIMITED",
            "BROKER_TYPE": "finance",
            "TRADE_NAME": "AAAA CAPITAL SERVICES PRIVATE LIMITED",
            "EXCHANGE_NAME": "BOMBAY STOCK EXCHANGE LIMITED",
            "EMAIL_ADDRESS": "AAA@cal2.vsnl.net.in",
            "BROKER_ADDRESS": "Calcutta"
        }
}
```

### Get broker details through search

- Server: `https://host`

#### Request

| Verb  | Endpoint   | Parameters | Body            |
| ----- | ---------- | ---------- | --------------- |
| `GET` | `/regnum/` | None       | Search criteria |

Search is allowed on following fields - individual or combination.

- Broker name
- Trade name
- Broker address

Example:

- Search by trade name only
  
```json
{
    "search" : {
        "TRADE_NAME" : "CAPITAL"
    }
}
```

- Search by broker name and address

```json
{
    "search" : {
        "BROKER_NAME" : "CAPITAL",
        "ADDRESS" : "Nungambakkam"
    }
}
```

#### Response

| Code  | Description                                      | Type               |
| ----- | ------------------------------------------------ | ------------------ |
| `200` | Broker details for all qualified search criteria | `application/json` |

Example

```json
{
    "r" :  [
        {
            "REGISTRATION_NUM": "Registration Number",
            "BROKER_NAME": "AAA CAPITAL SERVICES PRIVATE LIMITED",
            "BROKER_TYPE": "finance",
            "TRADE_NAME": "AAAA CAPITAL SERVICES PRIVATE LIMITED",
            "EXCHANGE_NAME": "BOMBAY STOCK EXCHANGE LIMITED",
            "EMAIL_ADDRESS": "AAA@cal2.vsnl.net.in",
            "BROKER_ADDRESS": "Calcutta"
        }
    ]
}
```
