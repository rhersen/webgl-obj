var textures = require('./textures');
var imageFactory = require('./imageFactory');
textures.setImageFactory(imageFactory);
var webgl = require("webgl");

var canvas = document.getElementById("webgl");
var gl = canvas.getContext("experimental-webgl");

function resizeHandler(canvas) {
    return function () {
        const margin = 16;
        canvas.height = window.innerHeight - margin;
        canvas.width = window.innerHeight - margin;
        webgl.setViewport(canvas.width, canvas.height);
    }
}

webgl.init(gl, textures);
resizeHandler(canvas)();
window.onresize = resizeHandler(canvas);

const DELAY = 56;
setInterval(webgl.draw, DELAY);
