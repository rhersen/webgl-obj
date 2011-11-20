var request = require('request');
var sl = require('../sl');

exports.index = function(req, res) {
    res.render('index', {
        title: 'SL',
        stations: [
            {name: 'Tullinge', id: 9525},
            {name: 'Karlberg', id: 9510}
        ]
    })
};

exports.html = function(req, res) {
    getDepartures(req.params.id, res, function (result, res) {
        res.render('station', result);
    });
};

exports.json = function(req, res) {
    getDepartures(req.params.id, res, function (result, res) {
        res.send(result);
    });
};

function getDepartures(stationId, res, done) {
    request(createParams(),
            function (error, response, body) {
                if (error) {
                    console.log(error.message);
                } else if (response.statusCode !== 200) {
                    console.log(response.statusCode);
                } else {
                    sl.extract(body, 'jquery-1.6.min.js', done, res);
                }
            });

    function createParams() {
        return {
            uri: sl.getUri(stationId),
            headers: {
                "user-agent": "node.js"
            }
        };
    }
}
