var countdown;

if (typeof require !== 'undefined') {
    countdown = require('../public/countdown');
}

exports.create = function () {
    var responseTime;
    var requestTime;
    var updated;

    function isExpired(now) {
        if (requestTime === undefined) {
            return true;
        }
        return now - responseTime > 10000 && now - requestTime > 30000;
    }

    function setUpdated(u) {
        updated = u;
    }

    function getTimeSinceUpdate(date) {
        if (updated) {
            return countdown.getNow(date) - countdown.millisSinceMidnight(updated);
        } else {
            return '?';
        }
    }

    function getTimeSinceRequest(now) {
        return now - requestTime;
    }

    function getTimeSinceResponse(now) {
        return now - responseTime;
    }

    function setRequest(currentTimeMillis) {
        requestTime = currentTimeMillis;
    }

    function setResponse(currentTimeMillis) {
        responseTime = currentTimeMillis;
    }

    function getResponseTime() {
        return responseTime;
    }

    return {
        getResponseTime: getResponseTime,
        setUpdated: setUpdated,
        setRequest: setRequest,
        setResponse: setResponse,
        isExpired: isExpired,
        getTimeSinceUpdate: getTimeSinceUpdate,
        getTimeSinceRequest: getTimeSinceRequest,
        getTimeSinceResponse: getTimeSinceResponse
    }
};
