var express = require('express');
var routes = require('./routes/routes');

module.exports = express.createServer();
var app = module.exports;

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

app.get('/', routes.index);
app.get('/departures/:id.:format?', routes.departures);
app.get('/station/:id', routes.station);
app.get('/clearCache', routes.clearCache);
app.get('/webgl', routes.webgl);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
