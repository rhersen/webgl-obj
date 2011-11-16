/**
 * Module dependencies.
 */

var express = require('express')
        , routes = require('./routes')

var app = module.exports = express.createServer();

var request = require('request');
var sl = require('./sl');

// Configuration

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/station/:id', function(req, res) {
    getRemote('http://mobilrt.sl.se/?tt=TRAIN&SiteId=' + req.params.id);
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

                    sl.extract(body, 'jquery-1.6.min.js', printResult);
                });

        function printResult(result) {
            res.render('station', result);
        }
    }
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
