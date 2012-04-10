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
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
}

resizeHandler(canvas)();
window.onresize = resizeHandler(canvas);
webgl.init(gl, textures);

const DELAY = 56;
setInterval(webgl.draw, DELAY);
