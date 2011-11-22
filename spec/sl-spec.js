require('jsdom');
var fs = require('fs');
var sl = require('../sl');

describe('jasmine-node', function() {
    it('should handle times with no delay', function() {
        var file = fs.readFileSync('spec/9525.html', 'utf-8');
        expect(file.length).toEqual(8005);
        sl.extract(file, '../public/jquery-1.6.min.js', function (result) {
            expect(result.station).toEqual('Tullinge');
            expect(result.updated).toEqual('21:26');
            expect(result.departures.length).toEqual(5);
            expect(result.departures[0].time).toEqual('21:26');
            expect(result.departures[0].destination).toEqual('Märsta');
            expect(result.departures[4].time).toEqual('22:03');
            expect(result.departures[4].destination).toEqual('Södertälje hamn');
            asyncSpecDone();
        });
        asyncSpecWait();
    });

    it('should handle times with one delay', function() {
        var file = fs.readFileSync('spec/delay.html', 'utf-8');
        expect(file.length).toEqual(8456);
        sl.extract(file, '../public/jquery-1.6.min.js', function (result) {
            expect(result.station).toEqual('Stuvsta');
            expect(result.updated).toEqual('17:07');
            expect(result.departures.length).toEqual(10);
            expect(result.departures[2].time).toEqual('17:20');
            expect(result.departures[2].delayed).toBeFalsy();
            expect(result.departures[2].destination).toEqual('Tumba');
            expect(result.departures[0].time).toEqual('17:09');
            expect(result.departures[0].delayed).toBeTruthy();
            expect(result.departures[0].destination).toEqual('Tumba');
            asyncSpecDone();
        });
        asyncSpecWait();
    });

    it('should handle html without the expected id tags', function() {
        var file = fs.readFileSync('spec/index.html', 'utf-8');
        sl.extract(file, '../public/jquery-1.6.min.js', function (result) {
            expect(result.departures.length).toEqual(0);
            asyncSpecDone();
        });
        asyncSpecWait();
    });
});
