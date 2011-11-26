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
        lib('table#departures tr:last').append('<td class="countdown"></td>');
    }
}

exports.getResponseTime = function () {
    return responseTime;
};

function isExpired(now) {
    return now - responseTime > 23000;
}

exports.init = function(lib, id, interval) {
    sendRequest(lib, id);

    if (interval) {
        setInterval(tick, interval);
    }

    function sendRequest(lib, id) {
        lib.getJSON('/departures/' + id + '.json', '', function (result) {
            setResult(lib, result, new Date().getTime());
        });
    }

    function tick() {
        lib('#expired').html((new Date().getTime() - responseTime));
        setCountdowns();
        
        if (isExpired(new Date().getTime())) {
            responseTime = undefined;
            sendRequest(lib, id);
        }

        function setCountdowns() {
            var now = new Date();
            lib('table#departures tr').each(function () {
                var time = $(this).find(':first-child').html();
                $(this).find(':last-child').html(getCountdown(time, now));
            });
        }
    }
};

exports.setResult = setResult;
exports.isExpired = isExpired;