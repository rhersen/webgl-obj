var responseTime;

function setResult(lib, result, currentTimeMillis) {
    responseTime = currentTimeMillis;

    lib('#title').html(result.station);
    lib('#updated').html(result.updated);
    lib('table#departures tr').remove();

    for (var i = 0; i < result.departures.length; i++) {
        createTableRow(result.departures[i]);
    }

    function createTableRow(departure) {
        lib('table#departures').append('<tr></tr>');
        lib('table#departures tr:last').append('<td></td>');
        lib('table#departures tr:last :first-child').html(departure.time);
        lib('table#departures tr:last').append('<td></td>');
        lib('table#departures tr:last :last-child').html(departure.destination);
    }
}

exports.getResponseTime = function () {
    return responseTime;
};

function isExpired(now) {
    return now - responseTime > 10000;
}

function sendRequest(lib, id) {
    lib.getJSON('/departures/' + id + '.json', '', function (data) {
        setResult(lib, data, new Date().getTime());
    });
}
exports.init = function(lib, id, interval) {
    sendRequest(lib, id);
    if (interval) {
        setInterval(tick, interval);
    }

    function tick() {
        lib('#expired').html((new Date().getTime() - responseTime));
        if (isExpired(new Date().getTime())) {
            responseTime = undefined;
            sendRequest(lib, id);
        }
    }
};

exports.setResult = setResult;
exports.isExpired = isExpired;