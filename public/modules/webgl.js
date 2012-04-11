var shaders = require('./shaders');

const PERIOD = 20000;
const PI2 = 2 * Math.PI;

var gl;
var vertexArray = new Array(8);
var vertices = new Float32Array(vertexArray);
var vertexBuf;

function draw() {
    updateVertices(new Date().getTime());
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length / 2);

    function updateVertices(millis) {
        var d = PI2 / 4;
        var angle = (millis % PERIOD) * PI2 / PERIOD;

        for (var i = 0; i < 4; i++) {
            var mapped = i < 2 ? i : 5 - i;
            vertexArray[mapped * 2] = Math.cos(angle);
            vertexArray[mapped * 2 + 1] = Math.sin(angle);
            angle += d;
        }

        vertices.set(vertexArray);
    }
}

function init(context, textures) {
    gl = context;
    var program = shaders.setupProgram(gl);
    vertexBuf = gl.createBuffer();

    var texCoordBuf = createTextureCoordinateBuffer();
    var texImage = textures.initTexture(gl);
    bind();

    function createTextureCoordinateBuffer() {
        var r = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, r);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), gl.STATIC_DRAW);
        return r;
    }

    function bind() {
        gl.uniform4fv(gl.getUniformLocation(program, "color"), [0, 0, 1, 1]);

        var loc = gl.getAttribLocation(program, "pos");
        gl.enableVertexAttribArray(loc);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

        loc = gl.getAttribLocation(program, "txc");
        gl.enableVertexAttribArray(loc);
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuf);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texImage);
        gl.uniform1i(gl.getUniformLocation(program, "tx"), 0);
    }
}

function setViewport(w, h) {
    gl.viewport(0, 0, w, h);
}

exports.init = init;
exports.draw = draw;
exports.setViewport = setViewport;