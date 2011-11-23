require('jsdom');
var fs = require('fs');
var station = require('../public/station');

describe('station', function () {
    var fixture = {
        "station":"Flemingsberg","updated":"21:32","departures":[
            {"delayed":false,"time":"21:45","destination":"Östertälje"},
            {"delayed":false,"time":"22:29","destination":"Märsta"}
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
                remove:function () {
                    called['remove'] = selector;
                }
            }
        };
        mock.getJSON = function (url, data, callback) {
            if (typeof callback === 'function') {
                called.json = true;
            }
        };
        mock.getCalled = function (x) {
            return called[x];
        };

        return mock;
    }

    it('should call getJSON', function () {
        var lib = createJqueryMock();
        station.init(lib, '9525');
        expect(lib.getCalled('json')).toBeTruthy();
    });

    it('should have undefined response time before setResult', function () {
        expect(station.getResponseTime()).toBeUndefined();
    });

    it('should not be expired before setResult', function () {
        expect(station.isExpired(1321995701)).toBeFalsy();
    });

    it('should have defined response time after setResult', function () {
        var lib = createJqueryMock();
        station.setResult(lib, fixture, 1321995701);
        expect(station.getResponseTime()).toEqual(1321995701);
    });

    it('should be expired a minute after setResult', function () {
        var lib = createJqueryMock();
        station.setResult(lib, fixture, 1320000000);
        expect(station.isExpired(1320065000)).toBeTruthy();
    });

    it('should not be expired ten seconds after setResult', function () {
        var lib = createJqueryMock();
        station.setResult(lib, fixture, 1320000000);
        expect(station.isExpired(1320010000)).toBeFalsy();
    });

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
        expect(lib.getCalled('table#departures tr:last :first-child')).toEqual('22:29');
    });

    it('should set time', function () {
        var lib = createJqueryMock();
        station.setResult(lib, fixture);
        expect(lib.getCalled('table#departures tr:last :last-child')).toEqual('Märsta');
    });
});
