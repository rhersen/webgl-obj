var target = require('../public/modules/webgl');

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
    drawElements:function (mode, count) {
        called.drawElements = count;
    },
    attachShader:nop
};

var imageFactoryMock = {};

imageFactoryMock.createImage = obj;

describe('webgl', function () {
    beforeEach(function () {
        called = {uniformMatrix4fv: {}};
    });

    it('should not return anything', function () {
        expect(target.init(glMock)).not.toBeDefined();
    });

    it('should not return anything', function () {
        expect(typeof target.mousemove).toEqual('function');
    });

    it('should use program', function () {
        target.init(glMock);
        expect(called.useProgram).toBeTruthy();
    });

    it('should draw a triangle', function () {
        target.draw();
        expect(called.drawElements).toEqual(3);
    });

    it('should set perspective matrix', function () {
        target.init(glMock);
        expect(called.uniformMatrix4fv['perspective'].length).toEqual(16);
    });

    it('should set view matrix', function () {
        target.init(glMock);
        expect(called.uniformMatrix4fv['view'].length).toEqual(16);
    });

    it('should set yRotation matrix', function () {
        target.init(glMock);
        expect(called.uniformMatrix4fv['yRotation'].length).toEqual(16);
    });

    it('yRotation matrix should be identity when mouse is in the middle', function () {
        target.mousemove(250, 250);
        expect(Math.abs(called.uniformMatrix4fv['yRotation'][2])).toBeLessThan(1e-9);
    });

    it('should rotate when mouse is not in the middle', function () {
        target.mousemove(200, 200);
        expect(called.uniformMatrix4fv['yRotation'][2]).toBeLessThan(0);
    });
});
