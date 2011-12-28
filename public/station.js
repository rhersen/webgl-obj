var expiry;

if (typeof require !== 'undefined') {
    expiry = require('../public/expiry');
}

var timer = expiry.create();

function abbreviate(name) {
    if (/hamn$/.test(name)) {
        return name.substring(0, name.length - 3);
    }

    if (/^Upplands /.test(name)) {
        return name.substring(9);
    }

    if (/^Väster/.test(name)) {
        return 'V‧' + name.substring(6);
    }

    return name;
}

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

    lib.ajax({
        url: '/departures/' + id + '.json',
        dataType: 'json',
        cache: false,
        success: function (result) {
            setResult(lib, result, new Date().getTime());
        }
    });
}

function setResult(lib, result, currentTimeMillis) {
    timer.setResponse(currentTimeMillis);
    timer.setUpdated(result.updated);
    updatePending(lib);

    lib('#title').html(result.station);
    lib('#predecessor').html(result.predecessor);
    lib('#successor').html(result.successor);
    lib('#updated').html(result.updated);
    lib('table#departures tr').remove();

    createTableRows(result.northbound, 'northbound');
    createTableRows(result.southbound, 'southbound');

    handleDirection(lib, lib('span#direction').text());

    var ev = typeof TouchEvent !== 'undefined' ? 'touchend' : 'mouseup';
    lib('#predecessor').bind(ev, getRequestSender(result.predecessor));
    lib('#successor').bind(ev, getRequestSender(result.successor));

    function createTableRows(departures, trClass) {
        for (var i = 0; i < departures.length; i++) {
            createTableRow(departures[i], trClass);
        }
    }

    function createTableRow(departure, trClass) {
        lib('table#departures').append('<tr></tr>');
        lib('table#departures tr:last').addClass(trClass);
        if (departure.delayed) {
            lib('table#departures tr:last').addClass('delayed');
        }
        lib('table#departures tr:last').append('<td></td>');
        lib('table#departures tr:last :first-child').html(departure.time);
        lib('table#departures tr:last').append('<td></td>');
        lib('table#departures tr:last :last-child').html(abbreviate(departure.destination));
        lib('table#departures tr:last').append('<td></td>');
        lib('table#departures tr:last td:last').addClass('countdown');
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

exports.init = function(lib, id, interval) {
    lib('button').click(function () {
        handleButtonClick(lib, lib(this).attr('class'));
    });

    drag.onUp(function (dragged) {
        id = 1 * id + (dragged.x < 0 ? -1 : 1);
        sendRequest(lib, id);
    });

    if (typeof TouchEvent !== 'undefined') {
        lib('#title').bind('touchstart touchmove touchend', handleDragEvents);
    } else {
        lib('#title').bind('mousedown mousemove mouseup', handleDragEvents);
    }

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
exports.abbreviate = abbreviate;