var shaders = require('./shaders');

function webgl(canvas, textures) {
    const PERIOD = 20000;
    const DELAY = 56;
    const PI2 = 2 * Math.PI;
    var gl = canvas.getContext("experimental-webgl");
    var vertexArray = new Array(6);
    var vertices = new Float32Array(vertexArray);
    var program = shaders.setupProgram(gl);

    var vertexBuf = gl.createBuffer();
    var texCoordBuf = createTextureCoordinateBuffer();
    var texImage = textures.initTexture(gl);

    bind();

    gl.viewport(0, 0, canvas.width, canvas.height);

    setInterval(draw, DELAY);

    function createTextureCoordinateBuffer() {
        var texCoordBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0.5, 1]), gl.STATIC_DRAW);
        return texCoordBuf;
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

    function draw() {
        updateVertices(new Date().getTime());
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length / 2);

        function updateVertices(millis) {
            var d = PI2 / 3;
            var angle = (millis % PERIOD) * PI2 / PERIOD;

            for (var i = 0; i < 3; i++) {
                vertexArray[i * 2] = Math.cos(angle);
                vertexArray[i * 2 + 1] = Math.sin(angle);
                angle += d;
            }

            vertices.set(vertexArray);
        }
    }
}

exports.webgl = webgl;
