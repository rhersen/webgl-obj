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
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, getFaces(), gl.STATIC_DRAW);
}
function getFaces() {
    return new Uint16Array([0, 2, 1, 0, 3, 2]);
}

function getVertices() {
    var vertices = new Float32Array(4 * 4);
    vertices.set([0.0000000e+0, 1.08866211, 0.0000000e+0, 1,
         0.0000000e+0, -0.54433105, 1.15470054, 1,
         -1.00000000, -0.54433105, -0.57735027, 1,
         1.00000000, -0.54433105, -0.57735027, 1
    ]);

    return vertices;
}
