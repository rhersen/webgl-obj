var expiry = require('../public/expiry');

describe('expiry', function () {

    it('should not be expired before setResponse', function () {
        var target = expiry.create();
        target.setRequest(1321900001);
        expect(target.isExpired(new Date(1321995701))).toBeFalsy();
    });

    it('should be expired before setRequest', function () {
        var target = expiry.create();
        expect(target.isExpired(new Date(1321995701))).toBeTruthy();
    });

    it('should be expired a minute after setResponse', function () {
        var target = expiry.create();
        target.setRequest(1320000000);
        target.setResponse(1320005000);
        target.setUpdated("7:40");
        expect(target.isExpired(new Date(1320065000))).toBeTruthy();
    });

    it('should not be expired five seconds after setResponse', function () {
        var target = expiry.create();
        target.setRequest(1320000000);
        target.setResponse(1320040000);
        target.setUpdated("7:39");
        expect(target.isExpired(new Date(1320045000))).toBeFalsy();
    });

    it('should be expired fifteen seconds after setResponse', function () {
        var target = expiry.create();
        target.setRequest(1320000000);
        target.setResponse(1320040000);
        target.setUpdated("7:39");
        expect(target.isExpired(new Date(1320055000))).toBeTruthy();
    });

    it('should not be expired fifteen seconds after request', function () {
        var target = expiry.create();
        target.setRequest(1320000000);
        target.setResponse(1320001900);
        target.setUpdated("7:39");
        target.setRequest(1320002000);
        expect(target.isExpired(new Date(1320017000))).toBeFalsy();
    });

    it('should be expired forty seconds after request', function () {
        var target = expiry.create();
        target.setRequest(1320000000);
        target.setResponse(1320001900);
        target.setRequest(1320002000);
        target.setUpdated("7:39");
        expect(target.isExpired(new Date(1320042000))).toBeTruthy();
    });

    it('should not be expired forty seconds after update', function () {
        var target = expiry.create();
        target.setRequest(1320000000);
        target.setResponse(1320001900);
        target.setRequest(1320002000);
        target.setUpdated("7:40");
        expect(target.isExpired(new Date(1320042000))).toBeFalsy();
    });

    it('should be pending before setRequest', function () {
        var target = expiry.create();
        expect(target.isPending()).toBeTruthy();
    });

    it('should be pending before setResponse', function () {
        var target = expiry.create();
        target.setRequest(1320000000);
        expect(target.isPending()).toBeTruthy();
    });

    it('should not be pending after setResponse', function () {
        var target = expiry.create();
        target.setRequest(1320000000);
        target.setResponse(1320001900);
        expect(target.isPending()).toBeFalsy();
    });

});
