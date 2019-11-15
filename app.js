const express = require('express')
const promiseDemo = require('./promise-demo.js')
const app = express()
const port = 3000

app.get('/api/v1/:userName', promiseDemo.snoopOnUser)

app.get('/api/v2/:userName', promiseDemo.betterSnooper)

app.get('/api/v3/:userName', promiseDemo.constantSnooper)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
