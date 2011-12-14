var countdown = require('../public/countdown');

describe('countdown', function () {
    it('should handle less than one minute', function () {
        expect(countdown.getCountdown("17:41", new Date(1322152807741))).toEqual("0:52.2");
    });

    it('should handle less than two minutes', function () {
        expect(countdown.getCountdown("17:41", new Date(1322152747147))).toEqual("1:52.8");
    });

    it('should round tenths to zero', function () {
        expect(countdown.getCountdown("17:41", new Date(1322152747000))).toEqual("1:53.0");
    });

    it('should handle departures next hour', function () {
        expect(countdown.getCountdown("18:01", new Date(1322152747000))).toEqual("21:53.0");
    });

    it('should handle departures far into next hour', function () {
        expect(countdown.getCountdown("18:39", new Date(1322153707000))).toEqual("43:53.0");
    });

    it('should handle train that has just departed', function () {
        var date = new Date(1322152860100);
        date.getTimezoneOffset = function () { return -60 };
        expect(countdown.getCountdown("17:41", date)).toEqual("-0:00.1");
    });

    it('should handle train that departed a minute ago', function () {
        var date = new Date(1322152860100);
        date.getTimezoneOffset = function () { return -60 };
        expect(countdown.getCountdown("17:40", date)).toEqual("-1:00.1");
    });

    it('should handle departures almost an hour from now', function () {
        expect(countdown.getCountdown("18:40", new Date(1322152860100))).toEqual("58:59.9");
    });

    it('should handle train that departs exactly now', function () {
        expect(countdown.getCountdown("17:41", new Date(1322152860000))).toEqual("0:00.0");
    });

    it('should handle hour without leading zero', function () {
        expect(countdown.millisSinceMidnight("5:00")).toEqual(18000000);
    });
});
