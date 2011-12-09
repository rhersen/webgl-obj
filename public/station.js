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

    for (var i = 0; i < result.northbound.length; i++) {
        createTableRow(result.northbound[i], 'northbound');
    }

    for (var i = 0; i < result.southbound.length; i++) {
        createTableRow(result.southbound[i], 'southbound');
    }

    handleDirection(lib);

    function createTableRow(departure, trClass) {
        lib('table#departures').append('<tr class="' + trClass + '"></tr>');
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

function handleDirection(lib, c) {
    if (!c) {
        c = lib('span#direction').text();
    }

    if (c != 'south') {
        lib('table#departures tr.northbound').show();
    } else {
        lib('table#departures tr.northbound').hide();
    }

    if (c != 'north') {
        lib('table#departures tr.southbound').show();
    } else {
        lib('table#departures tr.southbound').hide();
    }
}

function handleButtonClick(lib, c) {
    lib('span#direction').text(c);
    handleDirection(lib, c);
}

exports.init = function(lib, id, interval) {
    lib('button').click(function () {
        handleButtonClick(lib, lib(this).attr('class'));
    });

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
exports.handleButtonClick = handleButtonClick;
