var textures = require('./textures');
var imageFactory = require('./imageFactory');
textures.setImageFactory(imageFactory);

require("webgl").webgl(document.getElementById("webgl"), textures);
