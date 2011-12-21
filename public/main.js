var exports = {};
var countdown;
var expiry;
var drag;

function main() {
    $.getScript("/countdown.js", function() {
        countdown = exports;
        $.getScript("/expiry.js", function() {
            expiry = exports;
            $.getScript("/drag.js", function() {
                drag = exports;
                $.getScript("/station.js", function() {
                    exports.init($, $('#id').text(), 256);
                })
            })
        })
    })
}
