const express = require('express')
const path = require("path")
const bodyParser = require('body-parser')
const openUrl = require('./openBrowser')
const app = express()

const chouJiangRouter = require('./choujiang')

app.use(bodyParser.json())
app.use('/chouJiang', chouJiangRouter)
app.use(express.static(path.join(__dirname, '../')));
app.listen(9093, function() {
    console.log('Node app start at port 9093,http://localhost:9093/，http://localhost:9093/manager.html')
    // openUrl('http://localhost:9093/')
    // openUrl('http://localhost:9093/manager.html')
})