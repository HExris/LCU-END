const axios = require('axios')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const chat = () => {
  axios.get('http://localhost:3000/config').then(() => {
    axios({
      url: 'http://localhost:3000/proxy',
      method: 'POST',
      data: {
        url: '/lol-chat/v1/conversations',
        method: 'GET',
        data: {}
      }
    }).then(response => {
      console.log(response.data.data)
      if (response.data.data instanceof Array) {
        const roomInstance = response.data.data.find(conversation => conversation.type === 'championSelect')
        axios({
          url: 'http://localhost:3000/proxy',
          method: 'POST',
          data: {
            url: `/lol-chat/v1/conversations/${id}/messages`,
            method: 'POST',
            data: {
              body: 'Test message'
            }
          }
        }).then(response => {

        })
      }
    })
  })
}

module.exports = chat