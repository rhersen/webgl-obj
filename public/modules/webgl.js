var shaders = require('./shaders');

var gl;
var xRotation;
var yRotation;
var model;

function draw() {
    gl.drawElements(gl.TRIANGLES, model.getFaces().length, gl.UNSIGNED_SHORT, 0);
}

function mousemove(x, y) {
    gl.uniformMatrix4fv(yRotation, false, getYRotation(sinCos(x)));
    gl.uniformMatrix4fv(xRotation, false, getXRotation(sinCos(y)));

    function getXRotation(p) {
        return [
            1, 0, 0, 0,
            0, p.cos, -p.sin, 0,
            0, p.sin, p.cos, 0,
            0, 0, 0, 1
        ];
    }

    function getYRotation(p) {
        return [
            p.cos, 0, p.sin, 0,
            0, 1, 0, 0,
            -p.sin, 0, p.cos, 0,
            0, 0, 0, 1
        ];
    }

    function sinCos(coordinate) {
        var angle = (250 - coordinate) * 2 * Math.PI / 500;
        return {cos:Math.cos(angle), sin:Math.sin(angle)};
    }
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

    gl.uniformMatrix4fv(xRotation = gl.getUniformLocation(program, "xRotation"), false, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);

    gl.uniformMatrix4fv(yRotation = gl.getUniformLocation(program, "yRotation"), false, [
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
