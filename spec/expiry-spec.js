require('jsdom');
var expiry = require('../public/expiry');

describe('expiry', function () {

    it('should have undefined response time before setResponse', function () {
        var timer = expiry.create();
        expect(timer.getResponseTime()).toBeUndefined();
    });

    it('should not be expired before setResponse', function () {
        var timer = expiry.create();
        timer.setRequest(1321900001);
        expect(timer.isExpired(new Date(1321995701))).toBeFalsy();
    });

    it('should be expired before setRequest', function () {
        var timer = expiry.create();
        expect(timer.isExpired(new Date(1321995701))).toBeTruthy();
    });

    it('should be expired a minute after setResponse', function () {
        var timer = expiry.create();
        timer.setRequest(1320000000);
        timer.setResponse(1320005000);
        timer.setUpdated("7:40");
        expect(timer.isExpired(new Date(1320065000))).toBeTruthy();
    });

    it('should not be expired five seconds after setResponse', function () {
        var timer = expiry.create();
        timer.setRequest(1320000000);
        timer.setResponse(1320040000);
        timer.setUpdated("7:39");
        expect(timer.isExpired(new Date(1320045000))).toBeFalsy();
    });

    it('should be expired fifteen seconds after setResponse', function () {
        var timer = expiry.create();
        timer.setRequest(1320000000);
        timer.setResponse(1320040000);
        timer.setUpdated("7:39");
        expect(timer.isExpired(new Date(1320055000))).toBeTruthy();
    });

    it('should not be expired fifteen seconds after request', function () {
        var timer = expiry.create();
        timer.setRequest(1320000000);
        timer.setResponse(1320001900);
        timer.setUpdated("7:39");
        timer.setRequest(1320002000);
        expect(timer.isExpired(new Date(1320017000))).toBeFalsy();
    });

    it('should be expired forty seconds after request', function () {
        var timer = expiry.create();
        timer.setRequest(1320000000);
        timer.setResponse(1320001900);
        timer.setRequest(1320002000);
        timer.setUpdated("7:39");
        expect(timer.isExpired(new Date(1320042000))).toBeTruthy();
    });

    it('should not be expired forty seconds after update', function () {
        var timer = expiry.create();
        timer.setRequest(1320000000);
        timer.setResponse(1320001900);
        timer.setRequest(1320002000);
        timer.setUpdated("7:40");
        expect(timer.isExpired(new Date(1320042000))).toBeFalsy();
    });

});
