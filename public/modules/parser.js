var imageFactory;

function setImageFactory(f) {
    imageFactory = f;
}

function initTexture(gl) {
    var r = gl.createTexture();
    r.image = imageFactory.createImage();
    r.image.onload = setTextureParameters;
    r.image.src = "2048.png";

    return r;

    function setTextureParameters() {
        gl.bindTexture(gl.TEXTURE_2D, r);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, r.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
    }
}

exports.initTexture = initTexture;
exports.setImageFactory = setImageFactory;
