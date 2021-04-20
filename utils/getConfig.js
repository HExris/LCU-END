const process = require('child_process');

const getConfig = async (res) => {
    const isNumber = (val) => {
        if (parseFloat(val).toString() == "NaN") {

            return false;
        } else {
            return true;
        }
    }

    const getParam = (str, paramName) => {
        let value
        let fragments = str.split(paramName)[1]
        value = fragments.split(`"`)[0]
        return value
    }

    const cmd = `WMIC PROCESS WHERE name='LeagueClientUx.exe' GET commandline`;
    process.exec(cmd, function (error, stdout, stderr) {
        let port = ''
        let token = ''
        let portParamsName = '--app-port='
        let tokenParamsName = '--remoting-auth-token='
        if (stdout) {
            port = getParam(stdout, portParamsName)
            token = getParam(stdout, tokenParamsName)
            res.send({
                data: {
                    port,
                    token
                }
            })
        } else {
            res.send({
                data: ''
            })
        }
    });
}

module.exports = getConfig