# Ecowater API Client

---

## About
Simple example of Ecowater Water softener REST API client written in JS for NodeJS. Tested with eVOLUTION 200 Compact. May work well with other devices with slight modifications. Check remarks.

## Instalation
App requires NodeJS >= 13 (tested with 16.2.0).  
`yarn install`

## Usage

Set `ECOWATER_EMAIL`, `ECOWATER_PASSWORD`, `ECOWATER_DEVICE` in _.env_ file (copy _sample.env_ as template) according to your account at https://wifi.ecowater.com.
`ECOWATER_DEVICE` is the Device Serial Number (DSN) without #.  

Run `yarn start` to fetch device statistics.  
Run `yarn regenerate` to force resin regeneration.

## Remarks
Some values are calculated based on device properties that are loaded the first time you use the application from the zip file. One example is salt level which is calculated by: `value*100/max`.
Max value can be obtained from device properties file: https://wifi.ecowater.com/api/yml?version=0 (99602.yml).
By default, I assumed `max = 50` which is fine for eVOLUTION 200 Compact, but you probably should change that to fit your device.



