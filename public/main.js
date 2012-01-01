var exports = {};

var countdown;
var expiry;
var names;
var drag;

function main() {
    var files = ["/station.js", "/drag.js", "/names.js", "/expiry.js", "/countdown.js"];

    var closures = [
        function() { drag = exports; },
        function() { names = exports; },
        function() { expiry = exports; },
        function() { countdown = exports; }
    ];

    $.getScript(files.pop(), function loader() {
        if (closures.length) {
            closures.pop()();
            exports = {};
            $.getScript(files.pop(), loader);
        } else {
            exports.init($, $('#id').text(), 256);
        }
    })
}
