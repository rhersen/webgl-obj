var target = require('../public/names');

describe('target', function () {
    it('should abbreviate hamn', function () {
        expect(target.abbreviate("Södertälje hamn")).toEqual("Södertälje h");
    });

    it('should remove Upplands', function () {
        expect(target.abbreviate("Upplands Väsby")).toEqual("Väsby");
    });

    it('should abbreviate Väster', function () {
        expect(target.abbreviate("Västerhaninge")).toEqual("V‧haninge");
    });
});
