function setResult(lib, result) {
    lib('#title').html(result.station);
    lib('#updated').html(result.updated);

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

exports.init = function(lib, id) {
    lib.getJSON('/departures/' + id + '.json', '', function (data) {
        setResult(lib, data);
    });
};

exports.setResult = setResult;
