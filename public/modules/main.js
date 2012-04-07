var textures = require('./textures');
var imageFactory = require('./imageFactory');
textures.setImageFactory(imageFactory);
var webgl = require("webgl");

webgl.webgl(document.getElementById("webgl"), textures);

const DELAY = 56;
setInterval(webgl.draw, DELAY);
