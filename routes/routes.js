const TULLINGE = 9525;
const KARLBERG = 9510;
const CENTRALEN = 9001;

var request = require('request');

var sl = require('../sl');
exports.index = function (req, res) {
    res.render('index', {
        title:'SL',
        stations:[
            {name:'Tullinge', id:TULLINGE},
            {name:'Karlberg', id:KARLBERG},
            {name:'Centralen', id:CENTRALEN}
        ]
    })
};

exports.station = function (req, res) {
    res.render('station', {
        title:'Station',
        id:req.params.id
    })
};

exports.clearCache = function (req, res) {
    res.render('clearCache', {
        title:'Cache cleared'
    })
};

exports.departures = function (req, res) {
    var requestTime = new Date().getTime();

    console.log('GET departures(' + req.params.id + ') @ ' + new Date());

    request(createParams(req.params.id),
        function (error, response, body) {
            var responseTime = new Date().getTime();

            if (response) {
                console.log(response.statusCode + ' in ' + (responseTime - requestTime) + ' ms');
            } else {
                console.log('no response');
            }

            if (error) {
                console.log(error.message);
            } else {
                if (response.statusCode === 200) {
                    sl.extract(body, 'public/modules/jquery-1.6.min.js', req.params.format === 'json' ? sendJson : sendHtml, res);
                } else {
                    console.log(response.statusCode);
                    if (req.params.format === 'json') {
                        res.send({station:response.statusCode, updated:response.statusCode});
                    } else {
                        res.render('departures');
                    }
                }
            }
        });

    function createParams(stationId) {
        return {
            uri:sl.getUri(stationId),
            headers:{
                "user-agent":"node.js"
            }
        };
    }

    function sendHtml(result, response) {
        response.render('departures', result);
    }

    function sendJson(result, response) {
        result.predecessor = req.params.id - 1;
        result.successor = result.predecessor + 2;
        response.send(result);
    }
};
