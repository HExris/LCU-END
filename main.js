const express = require('express')
const app = express()
const port = 3000
const initData = require('./utils/initData.js')
const getConfig = require('./utils/getConfig.js')
const fs = require('fs'),
path = require('path');

app.listen(port, () => {
    initData()
})


app.get('/champions', (req, res) => {
    try {
        fs.readFile(path.join(__dirname, 'config/champions.json'), 'utf8', function (err, champions) {
            if (err) throw err;
            res.send({
                data: JSON.parse(champions)
            })

        });
    } catch (error) {
        error && res.send(error)
    }
})

app.get('/config', async (req, res) => {
    // getConfig(res)
    res.send('hello world')
})

app.get('/test', (req, res) => {
    res.send('Hello World!')
})