function getCountdown(time, nowTime) {
    var MINUTES = 60000;
    var HOURS = 60 * MINUTES;
    var countdown = getDeparture(time) - getNow(nowTime);

    return countdown < 0 ? '-' + format(-countdown) : format(countdown);

    function getDeparture(time) {
        var hour = time.substring(0, 2);
        var minute = time.substring(3);
        return hour * HOURS + minute * MINUTES;
    }

    function getNow(nowTime) {
        var offset = nowTime.getTimezoneOffset() * MINUTES;
        return (nowTime.getTime() - offset) % (24 * HOURS);
    }

    function format(millis) {
        var minutes = div(millis, 60000) % 60;
        var seconds = div(millis, 1000) % 60;
        var tenths = div(millis, 100) % 10;
        return minutes + ':' + seconds + '.' + tenths;

        function div(a, b) {
            var mod = a % b;
            return (a - mod) / b;
        }
    }
}

exports.getCountdown = getCountdown;
