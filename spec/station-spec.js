require('jsdom');
var expiry = require('../public/expiry');
var station = require('../public/station');

describe('station', function () {
    var fixture = {
        "station":"Flemingsberg","updated":"21:32","northbound":[
            {"delayed":false,"time":"22:29","destination":"Märsta"}
        ], "southbound":[
            {"delayed":false,"time":"21:45","destination":"Östertälje"}
        ]};

    function createJqueryMock() {
        var called = {};
        var mock = function (selector) {
            return {
                html:function (text) {
                    called[selector] = text;
                },
                append:function () {
                },
                addClass:function () {
                },
                show:function () {
                    called['show'] = selector;
                },
                hide:function () {
                    called['hide'] = selector;
                },
                remove:function () {
                    called['remove'] = selector;
                }
            }
        };
        mock.ajax = function (params) {
            called[params.dataType] = true;
            called['cache'] = params.cache;
        };
        mock.getCalled = function (x) {
            return called[x];
        };

        return mock;
    }

    it('should remove all table rows', function () {
        var lib = createJqueryMock();
        station.setResult(lib, fixture);
        expect(lib.getCalled('remove')).toEqual('table#departures tr');
    });

    it('should set station name', function () {
        var lib = createJqueryMock();
        station.setResult(lib, fixture);
        expect(lib.getCalled('#title')).toEqual('Flemingsberg');
    });

    it('should set update time', function () {
        var lib = createJqueryMock();
        station.setResult(lib, fixture);
        expect(lib.getCalled('#updated')).toEqual('21:32');
    });

    it('should set time', function () {
        var lib = createJqueryMock();
        station.setResult(lib, fixture);
        expect(lib.getCalled('table#departures tr:last :first-child')).toEqual('21:45');
    });

    it('should set time', function () {
        var lib = createJqueryMock();
        station.setResult(lib, fixture);
        expect(lib.getCalled('table#departures tr:last :last-child')).toEqual('Östertälje');
    });

    it('should show north on click', function () {
        var lib = createJqueryMock();
        station.handleButtonClick(lib, 'north');
        expect(lib.getCalled('show')).toEqual('table#departures tr.northbound');
        expect(lib.getCalled('hide')).toEqual('table#departures tr.southbound');
    });

    it('should show south on click', function () {
        var lib = createJqueryMock();
        station.handleButtonClick(lib, 'south');
        expect(lib.getCalled('show')).toEqual('table#departures tr.southbound');
        expect(lib.getCalled('hide')).toEqual('table#departures tr.northbound');
    });

    it('should not hide anything when northsouth is clicked', function () {
        var lib = createJqueryMock();
        station.handleButtonClick(lib, 'northsouth');
        expect(lib.getCalled('hide')).toBeUndefined();
    });
});
