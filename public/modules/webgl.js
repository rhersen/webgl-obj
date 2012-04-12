var shaders = require('./shaders');

var gl;
var vertices = new Float32Array(4 * 4);
var vertexBuf;

function draw() {
    updateVertices();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length / 4);

    function updateVertices() {
        for (var i = 0; i < 4; ++i) {
            setVertexValues(i);
        }

        function setVertexValues(i) {
            for (var j = 0; j < 4; j++) {
                vertices[4 * i + j] = getVertexValue(i, j);
            }

            function getVertexValue(i, j) {
                switch (j) {
                    case 0: return i < 2 ? -1 : 1;
                    case 1: return i % 2 ? 1 : -1;
                    case 2: return 0;
                    default: return 1;
                }
            }
        }
    }
}

function coordinates() {
    var r = new Float32Array(8);
    for (var i = 0; i < 4; ++i) {
        setCoordinateValues(i);
    }

    return r;

    function setCoordinateValues(i) {
        for (var j = 0; j < 2; j++) {
            r[2 * i + j] = getCoordinateValue(i, j);
        }

        function getCoordinateValue(i, j) {
            if (j === 0) {
                return i >= 2;
            } else {
                return i % 2;
            }
        }
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
        gl.bufferData(gl.ARRAY_BUFFER, coordinates(), gl.STATIC_DRAW);
        return r;
    }

    function bind() {
        var loc;
        gl.uniform4fv(gl.getUniformLocation(program, "color"), [0, 0, 1, 1]);

        loc = gl.getAttribLocation(program, "pos");
        gl.enableVertexAttribArray(loc);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
        gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 0, 0);

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