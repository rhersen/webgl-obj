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

exports.departures = function(req, res) {
    request(createParams(req.params.id),
            function (error, response, body) {
                if (error) {
                    console.log(error.message);
                } else if (response.statusCode !== 200) {
                    console.log(response.statusCode);
                } else {
                    sl.extract(body, 'jquery-1.6.min.js', req.params.format === 'json' ? sendJson : sendHtml, res);
                }
            });

    function createParams(stationId) {
        return {
            uri: sl.getUri(stationId),
            headers: {
                "user-agent": "node.js"
            }
        };
    }

    function sendHtml(result, response) {
        response.render('station', result);
    }

    function sendJson(result, response) {
        response.send(result);
    }
};
