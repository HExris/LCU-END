function initData(){
    const fs = require('fs'),
        path = require('path');

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
}

module.exports = initData