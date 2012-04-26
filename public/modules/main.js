var webgl = require("webgl");
var parser = require("parser");

var canvas = $('canvas#webgl');

$.get('/tetrahedron.obj', '', function (data) {
    var lines = data.split('\n').map(function (x) {
        return x.trim();
    });
    webgl.init(canvas[0].getContext("experimental-webgl"), parser.parse(lines));
}, 'text');

canvas.mousemove(function (event) {
    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;
    webgl.mousemove(x, y);
});

const DELAY = 56;
setInterval(webgl.draw, DELAY);
