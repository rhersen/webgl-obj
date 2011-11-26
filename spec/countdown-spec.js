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
});
