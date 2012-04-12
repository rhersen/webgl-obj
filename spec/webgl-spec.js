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
    bufferData:function (buffer, data) {
        called.bufferData = data;
    },
    getUniformLocation:nop,
    uniform4fv:nop,
    getAttribLocation:nop,
    enableVertexAttribArray:nop,
    vertexAttribPointer:nop,
    activeTexture:nop,
    bindTexture:nop,
    uniform1i:nop,
    viewport:function (x, y, w, h) {
        called.width = w;
        called.height = h;
    },
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

    it('should set vertices', function () {
        target.draw();
        expect(called.bufferData[0]).toEqual(-1);
        expect(called.bufferData[1]).toEqual(-1);
        expect(called.bufferData[2]).toEqual(0);
        expect(called.bufferData[3]).toEqual(1);
        expect(called.bufferData[4]).toEqual(-1);
        expect(called.bufferData[5]).toEqual(1);
        expect(called.bufferData[6]).toEqual(0);
        expect(called.bufferData[7]).toEqual(1);
        expect(called.bufferData[8]).toEqual(1);
        expect(called.bufferData[9]).toEqual(-1);
        expect(called.bufferData[10]).toEqual(0);
        expect(called.bufferData[11]).toEqual(1);
        expect(called.bufferData[12]).toEqual(1);
        expect(called.bufferData[13]).toEqual(1);
        expect(called.bufferData[14]).toEqual(0);
        expect(called.bufferData[15]).toEqual(1);
    });

    it('should set viewport', function () {
        target.setViewport(333, 444);
        expect(called.width).toEqual(333);
        expect(called.height).toEqual(444);
    });
});
