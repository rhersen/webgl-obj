var shaders = require('./shaders');

var gl;
var yRotation;

function draw() {
    gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);
}

function mousemove(x) {
    var angle = -x * 2 * Math.PI / 500;
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    gl.uniformMatrix4fv(yRotation, false, [
        c, 0, s, 0,
        0, 1, 0, 0,
        -s, 0, c, 0,
        0, 0, 0, 1
    ]);
}

function init(context) {
    gl = context;
    var program = shaders.setupProgram(gl);
    setupMatrices(program);
    setupVertices(program);
    setupElements();
}

exports.draw = draw;
exports.mousemove = mousemove;
exports.init = init;

function setupMatrices(program) {
    yRotation = gl.getUniformLocation(program, "yRotation");
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
    gl.uniformMatrix4fv(yRotation, false, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
}

function setupVertices(program) {
    var loc = gl.getAttribLocation(program, "pos");
    gl.enableVertexAttribArray(loc);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 0, 0);
    gl.bufferData(gl.ARRAY_BUFFER, getVertices(), gl.DYNAMIC_DRAW);
}

function setupElements() {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), gl.STATIC_DRAW);
}

function getVertices() {
    var vertices = new Float32Array(4 * 4);

    for (var i = 0; i < 3; ++i) {
        setVertexValues(i);
    }

    return vertices;

    function setVertexValues(i) {
        for (var j = 0; j < 4; j++) {
            vertices[4 * i + j] = getVertexValue(i, j);
        }

        function getVertexValue(i, j) {
            var angle = Math.PI * i / 1.5;
            switch (j) {
                case 0: return Math.cos(angle);
                case 1: return Math.sin(angle);
                case 2: return 0;
                default: return 1;
            }
        }
    }
}
