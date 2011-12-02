require('jsdom');
var expiry = require('../public/expiry');

describe('expiry', function () {

    beforeEach(function () {
        expiry.init();
    });

    it('should have undefined response time before setResponse', function () {
        expect(expiry.getResponseTime()).toBeUndefined();
    });

    it('should not be expired before setResponse', function () {
        expiry.setRequest(1321900001);
        expect(expiry.isExpired(1321995701)).toBeFalsy();
    });

    it('should be expired before setRequest', function () {
        expect(expiry.isExpired(1321995701)).toBeTruthy();
    });

    it('should be expired a minute after setResponse', function () {
        expiry.setRequest(1320000000);
        expiry.setResponse(1320005000);
        expect(expiry.isExpired(1320065000)).toBeTruthy();
    });

    it('should not be expired five seconds after setResponse', function () {
        expiry.setRequest(1320000000);
        expiry.setResponse(1320040000);
        expect(expiry.isExpired(1320045000)).toBeFalsy();
    });

    it('should be expired fifteen seconds after setResponse', function () {
        expiry.setRequest(1320000000);
        expiry.setResponse(1320040000);
        expect(expiry.isExpired(1320055000)).toBeTruthy();
    });

    it('should not be expired fifteen seconds after request', function () {
        expiry.setRequest(1320000000);
        expiry.setResponse(1320001900);
        expiry.setRequest(1320002000);
        expect(expiry.isExpired(1320017000)).toBeFalsy();
    });

    it('should be expired forty seconds after request', function () {
        expiry.setRequest(1320000000);
        expiry.setResponse(1320001900);
        expiry.setRequest(1320002000);
        expect(expiry.isExpired(1320042000)).toBeTruthy();
    });

});
