var request = require('request');
var fs = require('fs');
var sl = require('./sl');

if (process.argv.length === 2) {
    getLocal('spec/delay.html');
} else {
    getRemote('http://mobilrt.sl.se/?tt=TRAIN&SiteId=' + process.argv[2]);
}

function printResult(result) {
    console.log(result.station + '\t' + result.updated);
    result.northbound.forEach(printDeparture);
    console.log('━━━━━━━━━━━━━━');
    result.southbound.forEach(printDeparture);

    function printDeparture(d) {
        console.log(d.time + '\t' + d.destination);
    }
}

function getRemote(uri) {
    var params = {
        uri: uri,
        headers: {
            "user-agent": "node.js"
        }
    };
    request(params,
        function (error, response, body) {
            if (error) {
                console.log(error.message);
                return;
            }

            if (response.statusCode !== 200) {
                console.log(response.statusCode);
                return;
            }

            sl.extract(body, 'public/modules/jquery-1.6.min.js', printResult);
        });
}

function getLocal(filename) {
    fs.readFile(filename, function (err, file) {
        if (err) {
            throw err;
        }
        sl.extract(file, 'public/modules/jquery-1.6.min.js', printResult);
    });
}

