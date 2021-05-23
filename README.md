# Ecowater API Client

Simple example of using Ecowater Water softener REST API using NodeJS. Tested with eVOLUTION 200 Compact.

## Instalation
App requires NodeJS >= 13 (tested with 16.1.0).  
`yarn install`

## Usage

Set `ECOWATER_EMAIL`, `ECOWATER_PASSWORD`, `ECOWATER_DEVICE` in _.env_ file (copy _sample.env_ as template) according to your account at https://wifi.ecowater.com.
`ECOWATER_DEVICE` is the Device Serial Number (DSN) without #.  

Run `yarn start` to fetch device statistics.  
Run `yarn regenerate` to force resin regeneration.



