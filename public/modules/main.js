const DELAY = 256;

var imageFactory = require('./imageFactory');
require("webgl").webgl(document.getElementById("webgl"), imageFactory);
