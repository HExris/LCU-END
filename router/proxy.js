const fs = require('fs')
const axios = require('axios')
const path = require('path')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const prxoy = (req, res) => {
  fs.readFile(path.join(__dirname, '../config/env.json'), 'utf8', function (err, env) {
    if (err) return res.send(err)

    const envConfig = JSON.parse(env)

    if (!req.body.url) {
      return res.send({
        code: 501,
        msg: '请输入URL'
      })
    }
    
    req.body.url = `https://127.0.0.1:${envConfig.port}${req.body.url}`
    req.body.headers = { Authorization: envConfig.Authorization }

    console.log('req.body.url:', req.body.url)
    console.log('req.body.data:', req.body.data)
    axios(req.body).then((response) => {
      res.send({
        code: 200,
        data: response.data
      })
    }).catch((err) => {
      console.log(err)
    })
  })
}

module.exports = prxoy