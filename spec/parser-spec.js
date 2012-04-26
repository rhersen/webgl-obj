var fixture = [
    'o tetrahedron3',
    'v 0.0 1.09 0.0',
    'v 0.0 -0.5443 1.155',
    'v -1.0 -0.5443 -0.57735',
    'vn 0.0 1.0 0',
    'vn 0.0 -0.33333333 0.9428',
    'vn -0.8165 -0.33333333 -0.47',
    'f 1//1 3//3 2//2'];

var target = require('../public/modules/parser');

describe('parser', function () {
    it('should return vertices', function () {
        var model = target.parse(fixture);
        var result = model.getVertices();
        expect(result.length).toEqual(12);
        expect(result[1]).toBeCloseTo(1.09, 6);
        expect(result[6]).toBeCloseTo(1.155, 6);
        expect(result[7]).toBeCloseTo(1, 6);
        expect(result[8]).toBeCloseTo(-1, 6);
    });

    it('should return faces', function () {
        var model = target.parse(fixture);
        var result = model.getFaces();
        expect(result.length).toEqual(3);
        expect(result[0]).toEqual(0);
        expect(result[1]).toEqual(2);
    });
});
