var exports = {};
var countdown;
var expiry;

function main() {
    $.getScript("/countdown.js", function() {
        countdown = exports;
        $.getScript("/expiry.js", function() {
            expiry = exports;
            $.getScript("/station.js", function() {
                exports.init($, $('#id').text(), 256);
            })
        })
    })
}
