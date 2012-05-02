var vertex = 'uniform mat4 perspective;' +
    'uniform mat4 view;' +
    'uniform mat4 xRotation;' +
    'uniform mat4 yRotation;' +
    'varying vec4 color;' +
    'attribute vec4 pos;' +
    'void main() { gl_Position = perspective * view * xRotation * yRotation * pos; color = pos; }';

var fragment = 'precision mediump float;' +
    'varying vec4 color;' +
    'void main() {' +
    'gl_FragColor = ' +
    'vec4(1, 1, 0, 1);' +
    '}';

function setVertex(shader) {
    vertex = shader;
}

function setFragment(shader) {
    fragment = shader;
}

function setupProgram(gl) {
    var r = createProgram();
    gl.useProgram(r);
    return r;

    function createProgram() {
        var r = gl.createProgram();
        gl.attachShader(r, createShader(gl.VERTEX_SHADER, vertex));
        gl.attachShader(r, createShader(gl.FRAGMENT_SHADER, fragment));

        gl.linkProgram(r);

        return r;

        function createShader(type, source) {
            var r = gl.createShader(type);
            gl.shaderSource(r, source);
            gl.compileShader(r);
            return r;
        }
    }
}

exports.setupProgram = setupProgram;
exports.setVertex = setVertex;
exports.setFragment = setFragment;
