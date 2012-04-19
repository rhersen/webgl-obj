var textures = require('./textures');
var imageFactory = require('./imageFactory');
var webgl = require("webgl");

const margin = 16;

textures.setImageFactory(imageFactory);
var canvas = document.getElementById("webgl");
var gl = canvas.getContext("experimental-webgl");

function resizeHandler(canvas) {
    return function () {
        canvas.height = window.innerHeight - margin;
        canvas.width = window.innerHeight - margin;
        webgl.setViewport(canvas.width, canvas.height);
    }
}

webgl.init(gl);
resizeHandler(canvas)();
window.onresize = resizeHandler(canvas);

const DELAY = 56;
setInterval(webgl.draw, DELAY);
