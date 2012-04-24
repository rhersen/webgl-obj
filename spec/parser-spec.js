var target = require('../public/modules/parser');

var obj = function () { return {}; };

var glMock = {
    createTexture: obj
};

var imageFactoryMock = {};

imageFactoryMock.createImage = obj;

target.setImageFactory(imageFactoryMock);

describe('textures', function () {
    it('should return a texture', function () {
        var result = target.initTexture(glMock);
        expect(result.image).toBeDefined();
    });
});
