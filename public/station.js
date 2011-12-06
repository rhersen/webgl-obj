var expiry;

if (typeof require !== 'undefined') {
    expiry = require('../public/expiry');
}

var timer = expiry.create();

function setResult(lib, result, currentTimeMillis) {
    timer.setResponse(currentTimeMillis);
    timer.setUpdated(result.updated);

    lib('#title').html(result.station);
    lib('#updated').html(result.updated);
    lib('table#departures tr').remove();

    for (var i = 0; i < result.departures.length; i++) {
        createTableRow(result.departures[i]);
    }

    function createTableRow(departure) {
        lib('table#departures').append('<tr></tr>');
        if (departure.delayed) {
            lib('table#departures tr:last').addClass('delayed');
        }
        lib('table#departures tr:last').append('<td></td>');
        lib('table#departures tr:last :first-child').html(departure.time);
        lib('table#departures tr:last').append('<td></td>');
        lib('table#departures tr:last :last-child').html(departure.destination);
        lib('table#departures tr:last').append('<td></td>');
        lib('table#departures tr:last td:last').addClass('countdown');
    }
}

exports.init = function(lib, id, interval) {
    if (interval) {
        setInterval(tick, interval);
    }

    function sendRequest(lib, id) {
        timer.setRequest(new Date().getTime());
        lib.ajax({
            url: '/departures/' + id + '.json',
            dataType: 'json',
            cache: false,
            success: function (result) {
                setResult(lib, result, new Date().getTime());
            }
        });
    }

    function tick() {
        lib('#expired').html((timer.getDebugString()));

        setCountdowns();

        if (timer.isExpired(new Date())) {
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
