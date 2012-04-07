var target = require('../public/modules/webgl');
var textures = require('../public/modules/textures');

var nop = function () { };
var obj = function () { return {}; };
var glMock = {
    createProgram: nop,
    createShader: nop,
    getShaderParameter: nop,
    shaderSource: nop,
    compileShader: nop,
    linkProgram: nop,
    useProgram: nop,
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

var canvasMock = {};

canvasMock.getContext = function () {
    return glMock;
};

var imageFactoryMock = {};

imageFactoryMock.createImage = obj;

textures.setImageFactory(imageFactoryMock);

describe('webgl', function () {
    it('should not return anything', function () {
        expect(target.webgl(canvasMock, textures)).not.toBeDefined();
    });
});
