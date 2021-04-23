const scriptMap = {
  'pickChampion': '../scripts/pickChampionById.js'
};

const execScript = (req, res) => {
  const { name = '', params = undefined } = req.body
  console.log(name, params)
  if (!scriptMap[name]) {
    return res.send({
      code: 403,
      msg: 'Script name is invalid. '
    })
  } else {
    const script = require(scriptMap[name])
    script(params)
    res.send({ code: 200, msg: 'ok' });
  }
}
module.exports = execScript