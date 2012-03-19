const MINUTES = 60000;
const MINUTES_PER_HOUR = 60;
const HOURS = MINUTES_PER_HOUR * MINUTES;
const HOURS_PER_DAY = 24;

function getNow(nowTime) {
    var offset = nowTime.getTimezoneOffset() * MINUTES;
    return (nowTime.getTime() - offset) % (HOURS_PER_DAY * HOURS);
}

function millisSinceMidnight(time) {
    var colon = time.indexOf(':');
    if (colon < 1) {
        return undefined;
    } else {
        var hour = time.substring(0, colon);
        var minute = time.substring(colon + 1);
        return hour * HOURS + minute * MINUTES;
    }
}

function getCountdown(time, nowTime) {
    var countdown = millisSinceMidnight(time) - getNow(nowTime);

    if (countdown < 0) {
        return '-' + format(-countdown);
    } else {
        return format(countdown);
    }

    function format(millis) {
        var minutes = div(millis, MINUTES) % MINUTES_PER_HOUR;
        var seconds = div(millis, 1000) % MINUTES_PER_HOUR;
        var tenths = div(millis, 1000 / 10) % 10;
        return minutes + ':' + pad(seconds) + '.' + tenths;

        function div(a, b) {
            var mod = a % b;
            return (a - mod) / b;
        }

        function pad(number) {
            var r = number.toString();

            if (r.length < 2) {
                return '0' + r;
            }

            return r;
        }
    }
}

exports.getNow = getNow;
exports.millisSinceMidnight = millisSinceMidnight;
exports.getCountdown = getCountdown;
