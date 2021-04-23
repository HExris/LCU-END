const axios = require('axios')
var start = (championIds = []) => {
  console.log('Start pick up')

  // Simple request with fetch API
  const request = async (url, method = 'GET', body = {}) => {
    return new Promise((resolve, reject) => {
      axios({
        data: {
          url,
          method,
          data: body,
          headers: { 'Content-type': 'application/json; charset=UTF-8' }
        },
        url: 'http://localhost:3000/proxy',
        method: 'POST'
      }).then(res => res.status === 200 ? resolve(res.data.data) : resolve({})).catch(err => err && reject(err))
    })
  }

  // Check if match found is shown
  const isMatchFound = async () => {
    return (await request('/lol-matchmaking/v1/ready-check'))
      .state === 'InProgress'
  } // Default state}


  // Accept match
  const acceptMatch = async () => {
    console.log('acceptMatch')
    return await request('/lol-matchmaking/v1/ready-check/accept', 'POST')
  }

  // Get your action ID
  const getActionId = async () => {
    const { localPlayerCellId, actions } = (await request('/lol-champ-select/v1/session'))
    if (!actions) return -1
    return actions[0] // Index 0 is our team
      .find(a => a.actorCellId === localPlayerCellId) // Just find current player
      .id // We found action ID
  }

  // Pick a champion
  const pick = async (id, championId, callback) => {
    Object.keys((await request(
      `/lol-champ-select/v1/session/actions/${id}`,
      'PATCH', { championId }
    ))).length === 0 // Succeed
    await lock(id).then(() => callback())
  }

  // Lock the selection
  const lock = async (id) => (
    await request(`/lol-champ-select/v1/session/actions/${id}/complete`, 'POST')
  )

  // Start auto accept match found and pick-lock
  const inv = setInterval(async () => {
    // Check for match found
    if (await isMatchFound()) {
      console.log('Match is Found')
      // Accept match
      await acceptMatch()
    } else {
      const id = await getActionId()
      // Check for valid action ID
      if (id > -1) {
        // Stop this callback
        const callback = clearInterval(inv)
        // Pick each champ until done
        await pick(id, championIds[0], callback)
      }
    }
  }, 250) // Default timeout is 250ms
}

module.exports = start