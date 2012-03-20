require('jsdom');
var fs = require('fs');
var sl = require('../sl');

describe('jasmine-node', function() {
    it('should handle times with no delay', function() {
        var file = fs.readFileSync('spec/9525.html', 'utf-8');
        sl.extract(file, '../public/jquery-1.6.min.js', function (result) {
            expect(result.station).toEqual('Tullinge');
            expect(result.updated).toEqual('21:12');
            expect(result.northbound.length).toEqual(2);
            expect(result.southbound.length).toEqual(4);
            expect(result.northbound[0].time).toEqual('21:26');
            expect(result.northbound[0].destination).toEqual('Märsta');
            expect(result.northbound[1].time).toEqual('21:56');
            expect(result.northbound[1].destination).toEqual('Märsta');
            expect(result.southbound[0].time).toEqual('21:18');
            expect(result.southbound[0].destination).toEqual('Östertälje');
            expect(result.southbound[1].time).toEqual('21:33');
            expect(result.southbound[1].destination).toEqual('Södertälje hamn');
            expect(result.southbound[2].time).toEqual('21:48');
            expect(result.southbound[2].destination).toEqual('Östertälje');
            expect(result.southbound[3].time).toEqual('22:03');
            expect(result.southbound[3].destination).toEqual('Södertälje hamn');
            asyncSpecDone();
        });
        asyncSpecWait();
    });

    it('should handle Bålsta as northbound', function() {
        var file = fs.readFileSync('spec/balsta.html', 'utf-8');
        expect(file.length).toEqual(8099);
        sl.extract(file, '../public/jquery-1.6.min.js', function (result) {
            expect(result.northbound[0].destination).toEqual('Bålsta');
            asyncSpecDone();
        });
        asyncSpecWait();
    });
});
