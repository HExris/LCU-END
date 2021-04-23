const getCurrentTimestamp = (req, res ) => {
  res.send({ 
    code: 200,
    data: new Date().getTime()
  })
}

module.exports = getCurrentTimestamp