var names = require('../public/names');

describe('names', function () {
    it('should abbreviate hamn', function () {
        expect(names.abbreviate("Södertälje hamn")).toEqual("Södertälje h");
    });

    it('should remove Upplands', function () {
        expect(names.abbreviate("Upplands Väsby")).toEqual("Väsby");
    });

    it('should abbreviate Väster', function () {
        expect(names.abbreviate("Västerhaninge")).toEqual("V‧haninge");
    });
});
