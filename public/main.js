var exports = {};
var expiry;

function main() {
    $.getScript("/countdown.js", function() {
        $.getScript("/expiry.js", function() {
            expiry = exports;
            $.getScript("/station.js", function() {
                exports.init($, $('#id').text(), 256);
            })
        })
    })
}
