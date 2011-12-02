var responseTime;
var requestTime;

exports.init = function () {
    responseTime = undefined;
    requestTime = undefined;
};

exports.isExpired = function isExpired(now) {
    if (requestTime === undefined) {
        return true;
    }
    return now - responseTime > 10000 && now - requestTime > 30000;
};

exports.getTimeSinceRequest = function (now) {
    return now - requestTime;
}

exports.getTimeSinceResponse = function (now) {
    return now - responseTime;
}

exports.setRequest = function setRequest(currentTimeMillis) {
    requestTime = currentTimeMillis;
};

exports.setResponse = function setResponse(currentTimeMillis) {
    responseTime = currentTimeMillis;
};

exports.getRequestTime = function () {
    return requestTime;
};
exports.getResponseTime = function () {
    return responseTime;
};
