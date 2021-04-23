const process = require('child_process');
const fs = require('fs')
const path = require('path')
const getConfig = async (res) => {

  const getParam = (str, paramName) => {
    let value
    let fragments = str.split(paramName)[1]
    if (fragments) {
      value = fragments.split(`"`)[0]
      return value
    } else {
      return null
    }
  }

  const cmd = `WMIC PROCESS WHERE name='LeagueClientUx.exe' GET commandline`;
  process.exec(cmd, function (error, stdout, stderr) {
    const portParamsName = '--app-port='
    const tokenParamsName = '--remoting-auth-token='
    let port = ''
    let token = ''
    if (stdout) {
      port = getParam(stdout, portParamsName)
      token = getParam(stdout, tokenParamsName)
      const account = "riot"
      const auth = `${account}:${token}`
      const buf = Buffer.from(auth, 'ascii').toString('base64')
      const config = {
        port,
        token,
        Authorization: `Basic ${buf}`,
        timestamp: new Date().getTime()
      }
      fs.writeFile(path.join(__dirname, '../config/env.json'), JSON.stringify(config), 'utf8', (err) => {
        if (err) throw err;
      });
      res.send({
        data: config
      })
    } else {
      res.send({
        data: ''
      })
    }
  });
}

module.exports = getConfig