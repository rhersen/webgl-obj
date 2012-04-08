var target = require('../public/modules/shaders');

var called = false;

var nop = function () { };
var obj = function () { return {}; };

var glMock = {
    createProgram: nop,
    createShader: nop,
    getShaderParameter: nop,
    shaderSource: nop,
    compileShader: nop,
    linkProgram: nop,
    useProgram: function () {
        called = true;
    },
    createBuffer: nop,
    createTexture: obj,
    bindBuffer: nop,
    bufferData: nop,
    getUniformLocation: nop,
    uniform4fv: nop,
    getAttribLocation: nop,
    enableVertexAttribArray: nop,
    vertexAttribPointer: nop,
    activeTexture: nop,
    bindTexture: nop,
    uniform1i: nop,
    viewport: nop,
    drawArrays: nop,
    attachShader: nop
};

describe('shaders', function () {
    it('should setup program', function () {
        var result = target.setupProgram(glMock);
        expect(result).not.toBeDefined();
    });

    it('should use program', function () {
        target.setupProgram(glMock);
        expect(called).toBeTruthy();
    });
});
