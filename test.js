const headers = { Authorization: 'Basic cmlvdDp1b2ktYVVMVFp0S19neml6WlZFQ1ZR' }
const url = 'https://127.0.0.1:14405/lol-chat/v1/conversations/'

const request = require('request')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

request.get({ url, headers }, (err, response, body) => {
  console.info(body)
})