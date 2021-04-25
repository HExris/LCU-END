const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const path = require('path');
const initData = require('./utils/initData.js')
const getConfig = require('./utils/getConfig.js')
const proxy = require('./router/proxy.js')
const execScript = require('./router/execScript.js')
const getCurrentTimestamp = require('./utils/getCurrentTimestamp')
const bodyParser = require('body-parser');//用于req.body获取值的
const chat = require('./utils/chat')

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/',express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  initData()
})

// Init backend enviorment
app.get('/init', (req, res) => {
  initData()
  res.send('Success')
})

// Proxy
app.post('/proxy', (req, res) => proxy(req, res)) 

// Proxy
app.post('/script', (req, res) => execScript(req, res)) 

// getCurrentTimestamp
app.get('/timestamp', (req, res) => getCurrentTimestamp(req, res))

// Get champions
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

// Get config
app.get('/config', async (req, res) => {
  getConfig(res)
})

// Get config
app.get('/chat', async (req, res) => {
  chat(res)
})

// Test
app.get('/test', (req, res) => {
  res.send('Hello World!')
})