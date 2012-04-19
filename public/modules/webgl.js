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

function init(context) {
    gl = context;
    var program = shaders.setupProgram(gl);
    vertexBuf = gl.createBuffer();

    gl.uniform4fv(gl.getUniformLocation(program, "color"), [0, 0, 1, 1]);
    gl.uniformMatrix4fv(gl.getUniformLocation(program, "perspective"), false, [
        2, 0, 0, 0,
        0, 2, 0, 0,
        0, 0, -1, -1,
        0, 0, -1, 0
    ]);
    gl.uniformMatrix4fv(gl.getUniformLocation(program, "view"), false, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, -4, 1
    ]);
    var loc = gl.getAttribLocation(program, "pos");
    gl.enableVertexAttribArray(loc);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
    gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 0, 0);
}

function setViewport(w, h) {
    gl.viewport(0, 0, w, h);
}

exports.init = init;
exports.draw = draw;
exports.setViewport = setViewport;