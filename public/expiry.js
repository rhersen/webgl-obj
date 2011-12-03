exports.create = function () {
    var responseTime;
    var requestTime;

    function isExpired(now) {
        if (requestTime === undefined) {
            return true;
        }
        return now - responseTime > 10000 && now - requestTime > 30000;
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
        setRequest: setRequest,
        setResponse: setResponse,
        isExpired: isExpired,
        getTimeSinceRequest: getTimeSinceRequest,
        getTimeSinceResponse: getTimeSinceResponse
    }
};
