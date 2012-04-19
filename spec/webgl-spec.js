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
    getUniformLocation: function (location, name) {
        return name;
    },
    uniform4fv:nop,
    uniformMatrix4fv: function (location, transpose, value) {
        called.uniformMatrix4fv[location] = value;
    },
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
        called = {uniformMatrix4fv: {}};
    });

    it('should not return anything', function () {
        expect(target.init(glMock)).not.toBeDefined();
    });

    it('should use program', function () {
        target.init(glMock);
        expect(called.useProgram).toBeTruthy();
    });

    it('should draw a quad', function () {
        target.draw();
        expect(called.drawArrays).toEqual(4);
    });

    it('should set perspective matrix', function () {
        target.init(glMock);
        expect(called.uniformMatrix4fv['perspective'].length).toEqual(16);
    });

    it('should set view matrix', function () {
        target.init(glMock);
        expect(called.uniformMatrix4fv['view'].length).toEqual(16);
    });

    it('should set viewport', function () {
        target.setViewport(333, 444);
        expect(called.width).toEqual(333);
        expect(called.height).toEqual(444);
    });
});
