var textures = require('./textures');
var imageFactory = require('./imageFactory');
var webgl = require("webgl");

textures.setImageFactory(imageFactory);
var canvas = $('canvas#webgl');
var gl = canvas[0].getContext("experimental-webgl");

webgl.init(gl);

canvas.mousemove(function (event) {
    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;
    webgl.mousemove(x, y);
});

const DELAY = 56;
setInterval(webgl.draw, DELAY);
