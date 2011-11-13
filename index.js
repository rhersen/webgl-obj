var request = require('request');
var fs = require('fs');
var sl = require('./sl');

if (process.argv.length === 2) {
    getLocal('spec/9525.html');
} else {
    getRemote('http://mobilrt.sl.se/?tt=TRAIN&SiteId=' + process.argv[2]);
}

function printResult(result) {
    console.log(result.station + '\t' + result.updated);
    for (var i = 0; i < result.departures.length; i++) {
        var obj = result.departures[i];
        console.log(obj.time + '\t' + obj.destination);
    }
}

function getRemote(uri) {
    console.log(uri);
    request({ uri: uri, headers: { "user-agent": "node.js" } },
            function (error, response, body) {
                if (error && response.statusCode !== 200) {
                    console.log(error);
                }

                sl.extract(body, 'jquery-1.6.min.js', printResult);
            });
}

function getLocal(filename) {
    fs.readFile(filename, function (err, file) {
        if (err) throw err;
        sl.extract(file, 'jquery-1.6.min.js', printResult);
    });
}

