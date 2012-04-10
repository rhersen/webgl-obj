var target = require('../public/modules/webgl');
var textures = require('../public/modules/textures');

var nop = function () {
};
var obj = function () {
    return {};
};

var called = {};

var glMock = {
    createProgram:nop,
    createShader:nop,
    getShaderParameter:nop,
    shaderSource:nop,
    compileShader:nop,
    linkProgram:nop,
    useProgram:function () {
        called.useProgram = true;
    },
    createBuffer:nop,
    clear:obj,
    clearColor:obj,
    createTexture:obj,
    bindBuffer:nop,
    bufferData:nop,
    getUniformLocation:nop,
    uniform4fv:nop,
    getAttribLocation:nop,
    enableVertexAttribArray:nop,
    vertexAttribPointer:nop,
    activeTexture:nop,
    bindTexture:nop,
    uniform1i:nop,
    viewport:nop,
    drawArrays:function (mode, first, count) {
        called.drawArrays = count;
    },
    attachShader:nop
};

var imageFactoryMock = {};

imageFactoryMock.createImage = obj;

textures.setImageFactory(imageFactoryMock);

describe('webgl', function () {
    beforeEach(function () {
        called = {};
    });

    it('should not return anything', function () {
        expect(target.init(glMock, textures)).not.toBeDefined();
    });

    it('should use program', function () {
        target.init(glMock, textures);
        expect(called.useProgram).toBeTruthy();
    });

    it('should draw a quad', function () {
        target.draw();
        expect(called.drawArrays).toEqual(4);
    });
});
