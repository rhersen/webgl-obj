function setupProgram(gl) {
    var r = createProgram();
    gl.useProgram(r);
    return r;

    function createProgram() {
        var r = gl.createProgram();

        gl.attachShader(r, createShader(gl.VERTEX_SHADER,
            'uniform mat4 perspective;' +
                'uniform mat4 view;' +
                'uniform mat4 yRotation;' +
                'attribute vec4 pos;' +
                'void main() { gl_Position = perspective * view * yRotation * pos; }'));

        gl.attachShader(r, createShader(gl.FRAGMENT_SHADER,
            'precision mediump float;' +
                'uniform vec4 color;' +
                'void main() {' +
                'gl_FragColor = ' +
                'vec4(1, 0, 0, 1);' +
                '}'));

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
