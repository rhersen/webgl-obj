var webgl = require("./webgl");
var parser = require("./parser");
var shaders = require("./shaders");

var canvas = $('canvas#webgl');

var vertexLoaded = function (data) {
    shaders.setVertex(data);
    $.get('/shader.frag', '', fragmentLoaded, 'text');
};

var fragmentLoaded = function (data) {
    shaders.setFragment(data);
    $.get('/cube.obj', '', modelLoaded, 'text');
};

var modelLoaded = function (data) {
    var lines = data.split('\n').map(function (x) {
        return x.trim();
    });
    webgl.init(canvas[0].getContext("experimental-webgl"), parser.parse(lines));
};

$.get('/shader.vert', '', vertexLoaded, 'text');

canvas.mousemove(function (event) {
    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;
    webgl.mousemove(x, y);
    webgl.draw();
});
