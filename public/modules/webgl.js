var shaders = require('./shaders');

var gl;
var yRotation;
var model;

function draw() {
    gl.drawElements(gl.TRIANGLES, model.getFaces().length, gl.UNSIGNED_SHORT, 0);
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

function init(context, parsed) {
    gl = context;
    model = parsed;
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
    gl.bufferData(gl.ARRAY_BUFFER, model.getVertices(), gl.DYNAMIC_DRAW);
}

function setupElements() {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, model.getFaces(), gl.STATIC_DRAW);
}
