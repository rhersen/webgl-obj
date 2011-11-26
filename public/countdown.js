function getCountdown(time, now) {
    var departureMinute = time.substring(3);
    var nowMillis = now.getTime() % 3600000;
    return calc(departureMinute * 60000 - nowMillis + 3600000);

    function calc(millis) {
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
