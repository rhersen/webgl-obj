require('jsdom');
var fs = require('fs');
var sl = require('../sl');

describe('jasmine-node', function() {
    it('should extract times', function() {
        var file = fs.readFileSync('spec/9525.html', 'utf-8');
        expect(file.length).toEqual(8005);
        sl.extract(file, '../jquery-1.6.min.js', function (result) {
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
});
