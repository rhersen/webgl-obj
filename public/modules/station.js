var expiry = require('expiry');
var names = require('names');
var countdown = require('countdown');

var timer = expiry.create();

function updatePending(lib) {
    if (timer.isPending()) {
        lib('body').addClass('pending');
    } else {
        lib('body').removeClass('pending');
    }
}

function sendRequest(lib, id) {
    timer.setRequest(new Date().getTime());
    updatePending(lib);
    lib('#predecessor').unbind('mouseup touchend');
    lib('#successor').unbind('mouseup touchend');
    lib('#title').html(id);
    lib('#predecessor').html(' ');
    lib('#successor').html(' ');

    lib.ajax({
        url: '/departures/' + id + '.json',
        dataType: 'json',
        cache: false,
        success: function (result) {
            setResult(lib, result, new Date().getTime());
        }
    });

    lib('span#id').text(id);
}

function setResult(lib, result, currentTimeMillis) {
    timer.setResponse(currentTimeMillis);
    timer.setUpdated(result.updated);
    updatePending(lib);

    lib('#title').html(names.abbreviate(result.station));
    lib('#predecessor').html(result.predecessor);
    lib('#successor').html(result.successor);
    lib('#updated').html(result.updated);
    lib('table#departures tr').remove();

    result.northbound.forEach(createTableRow('northbound'));
    result.southbound.forEach(createTableRow('southbound'));
    handleDirection(lib, lib('span#direction').text());

    var ev = typeof TouchEvent !== 'undefined' ? 'touchend' : 'mouseup';
    lib('#predecessor').bind(ev, getRequestSender(result.predecessor));
    lib('#successor').bind(ev, getRequestSender(result.successor));

    function createTableRow(trClass) {
        return function (departure) {
            lib('table#departures').append('<tr></tr>');
            lib('table#departures tr:last').addClass(trClass);
            if (departure.delayed) {
                lib('table#departures tr:last').addClass('delayed');
            }
            lib('table#departures tr:last').append('<td></td>');
            lib('table#departures tr:last :first-child').html(departure.time);
            lib('table#departures tr:last').append('<td></td>');
            lib('table#departures tr:last :last-child').html(names.abbreviate(departure.destination));
            lib('table#departures tr:last').append('<td></td>');
            lib('table#departures tr:last td:last').addClass('countdown');
        }
    }

    function getRequestSender(id) {
        return function () {
            sendRequest(lib, id);
        };
    }
}

function handleButtonClick(lib, c) {
    lib('span#direction').text(c);
    handleDirection(lib, c);
}

function init(lib, id, interval) {
    lib('span#id').text(id);

    lib('button').click(function () {
        handleButtonClick(lib, lib(this).attr('class'));
    });

    lib('button.clear').click(function () {
        require.clearCache();
        alert('cache cleared');
    });

    if (interval) {
        setInterval(tick, interval);
    }

    function handleDragEvents(event) {
        drag.send(event);

        lib('#expired').html(drag.getState() ? drag.getState().x + '|' + drag.getState().y : 'inactive');

        if (drag.getState()) {
            lib('#title').css('marginLeft', drag.getState().x + 'px');
            lib('#title').css('background', 'black');
        } else {
            lib('#title').css('background', '');
        }

        return false;
    }

    function tick() {
        lib('#expired').html((timer.getDebugString()));

        setCountdowns();

        if (timer.isExpired(new Date())) {
            sendRequest(lib, lib('span#id').text());
        }

        function setCountdowns() {
            var now = new Date();
            lib('table#departures tr').each(function () {
                var time = $(this).find(':first-child').html();
                $(this).find(':last-child').html(countdown.getCountdown(time, now));
            });
        }
    }
}

function handleDirection(lib, c) {
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

exports.setResult = setResult;
exports.handleButtonClick = handleButtonClick;
exports.init = init;