var target = require('../public/modules/webgl');
var parser = require('../public/modules/parser');

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

var model = parser.parse([
    'o tetrahedron3',
    'v 0.0 1.09 0.0',
    'v 0.0 -0.5443 1.155',
    'v -1.0 -0.5443 -0.57735',
    'vn 0.0 1.0 0',
    'vn 0.0 -0.33333333 0.9428',
    'vn -0.8165 -0.33333333 -0.47',
    'f 1//1 3//3 2//2']);

describe('webgl', function () {
    beforeEach(function () {
        called = {uniformMatrix4fv: {}};
    });

    it('should not return anything', function () {
        expect(target.init(glMock, model)).not.toBeDefined();
    });

    it('should not return anything', function () {
        expect(typeof target.mousemove).toEqual('function');
    });

    it('should use program', function () {
        target.init(glMock, model);
        expect(called.useProgram).toBeTruthy();
    });

    it('should set perspective matrix', function () {
        target.init(glMock, model);
        expect(called.uniformMatrix4fv['perspective'].length).toEqual(16);
    });

    it('should set view matrix', function () {
        target.init(glMock, model);
        expect(called.uniformMatrix4fv['view'].length).toEqual(16);
    });

    it('should set yRotation matrix', function () {
        target.init(glMock, model);
        expect(called.uniformMatrix4fv['yRotation'].length).toEqual(16);
    });

    it('yRotation matrix should be identity when mouse is in the middle', function () {
        target.mousemove(250, 250);
        var matrix4fv = called.uniformMatrix4fv['yRotation'];
        for (var i = 0; i < 16; i++) {
            expect(matrix4fv[i]).toBeCloseTo((i % 5) ? 0 : 1, 9);
        }
    });

    it('should rotate when mouse is not in the middle', function () {
        target.mousemove(200, 200);
        expect(called.uniformMatrix4fv['yRotation'][2]).toBeGreaterThan(0);
    });

    it('xRotation matrix should be identity when mouse is in the middle', function () {
        target.mousemove(250, 250);
        var matrix4fv = called.uniformMatrix4fv['xRotation'];
        for (var i = 0; i < 16; i++) {
            expect(matrix4fv[i]).toBeCloseTo((i % 5) ? 0 : 1, 9);
        }
    });

    it('should rotate when mouse is not in the middle', function () {
        target.mousemove(200, 200);
        expect(called.uniformMatrix4fv['xRotation'][9]).toBeGreaterThan(0);
    });
});
