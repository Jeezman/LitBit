# LitBitPay

LitBitPay is a PayRoll System used to pay employees base on schedules. Schedules can 
be hourly, weekly monthly.


![demo](./lnme-demo.gif)


LitBitPay focuses on simplicity and ease of payment. It connects to an existing lightning node (currently LND is supported) to exchange 
bitcoin between employer and configured employees periodically based on the schedule for employee.

LnMe is one [simple executable](https://github.com/bumi/lnme/releases) file that can be deployed anywhere with no dependencies. (on your own node or for example with [one click on Heroku](#heroku))

## Features

- [x] Manage employee details
- [x] Create employee's invoice
- [x] Pay employee's invoice
- [x] Listen for payment
- [x] LND support

## Installation

LitBitPay connects to your [LND node](https://github.com/lightningnetwork/lnd/blob/master/docs/INSTALL.md), so a running LND node is required.
LitBitPay can easily run next to LND on the same system or any other hosting provider.

You need to have [Node](https://nodejs.org/en/download/) installed. Simply download the binary and run it!
Ensure the the below command runs

1. `$ node -v`
2. `$ npm -v`
3. `$ https://github.com/Jeezman/LitBit.git `

## Start Server
4. `$ cd /LitBit/server`
4  `$ npm install`
5  `$ npm run dev`

**Note** : LitBitPay server runs on port 3000 by default.

