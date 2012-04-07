function setupProgram(gl) {
    var r = createProgram();
    gl.useProgram(r);
    return r;

    function createProgram() {
        var r = gl.createProgram();

        gl.attachShader(r, createShader(gl.VERTEX_SHADER,
            'attribute vec2 pos; attribute vec2 txc; varying vec2 ftxc;' +
                'void main() { gl_Position = vec4(pos, 0, 1.1); ftxc = txc; }'));

        gl.attachShader(r, createShader(gl.FRAGMENT_SHADER,
            'precision mediump float; uniform vec4 color; uniform sampler2D tx; varying vec2 ftxc;' +
                'void main() { gl_FragColor = ' +
                'texture2D(tx, vec2(ftxc.s, ftxc.t));' +
                ' }'));

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
