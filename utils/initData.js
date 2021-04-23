const fs = require('fs');
const path = require('path');
function initData() {
  fs.readFile(path.join(__dirname, '../config/champions.json'), 'utf8', function (err, champions) {
    if (err || !champions) {
      fs.readFile(path.join(__dirname, '../data/champion.json'), 'utf8', function (err, champions) {
        if (err) throw err;
        let {
          data
        } = JSON.parse(champions)

        let championList = []

        if (Object.keys(data).length) {
          for (const championName in data) {
            if (Object.hasOwnProperty.call(data, championName)) {
              const champion = data[championName];
              championList.push(champion)
            }
          }
        }

        fs.writeFile(path.join(__dirname, '../config/champions.json'), JSON.stringify(championList), 'utf8', (err) => {
          if (err) throw err;
          console.log('done');
        });

      });
    } else {
      return false
    }
  });
}

module.exports = initData