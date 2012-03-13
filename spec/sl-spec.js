require('jsdom');
var fs = require('fs');
var sl = require('../sl');

describe('jasmine-node', function() {
    it('should handle times with no delay', function() {
        var file = fs.readFileSync('spec/9525.html', 'utf-8');
        expect(file.length).toEqual(8005);
        sl.extract(file, '../public/modules/jquery-1.6.min.js', function (result) {
            expect(result.station).toEqual('Tullinge');
            expect(result.updated).toEqual('21:26');
            expect(result.northbound.length).toEqual(3);
            expect(result.southbound.length).toEqual(2);
            expect(result.northbound[0].time).toEqual('21:26');
            expect(result.northbound[0].destination).toEqual('Märsta');
            expect(result.southbound[1].time).toEqual('22:03');
            expect(result.southbound[1].destination).toEqual('Södertälje hamn');
            asyncSpecDone();
        });
        asyncSpecWait();
    });

    it('should handle times with one delay', function() {
        var file = fs.readFileSync('spec/delay.html', 'utf-8');
        expect(file.length).toEqual(8456);
        sl.extract(file, '../public/modules/jquery-1.6.min.js', function (result) {
            expect(result.station).toEqual('Stuvsta');
            expect(result.updated).toEqual('17:07');
            expect(result.southbound.length).toEqual(6);
            expect(result.southbound[2].time).toEqual('17:20');
            expect(result.southbound[2].delayed).toBeFalsy();
            expect(result.southbound[2].destination).toEqual('Tumba');
            expect(result.southbound[0].time).toEqual('17:09');
            expect(result.southbound[0].delayed).toBeTruthy();
            expect(result.southbound[0].destination).toEqual('Tumba');
            asyncSpecDone();
        });
        asyncSpecWait();
    });

    it('should handle Bålsta as northbound', function() {
        var file = fs.readFileSync('spec/balsta.html', 'utf-8');
        expect(file.length).toEqual(8099);
        sl.extract(file, '../public/modules/jquery-1.6.min.js', function (result) {
            expect(result.northbound[0].destination).toEqual('Bålsta');
            asyncSpecDone();
        });
        asyncSpecWait();
    });

    it('should handle html without the expected id tags', function() {
        var file = fs.readFileSync('spec/index.html', 'utf-8');
        sl.extract(file, '../public/modules/jquery-1.6.min.js', function (result) {
            expect(result.southbound.length).toEqual(0);
            asyncSpecDone();
        });
        asyncSpecWait();
    });
});
