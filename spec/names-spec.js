var target = require('../public/names');

describe('target', function () {
    it('should abbreviate hamn', function () {
        expect(target.abbreviate("Södertälje hamn")).toEqual("Södertälje h");
    });

    it('should remove Upplands', function () {
        expect(target.abbreviate("Upplands Väsby")).toEqual("Väsby");
    });

    it('should remove Stockholms', function () {
        expect(target.abbreviate("Stockholms södra")).toEqual("södra");
    });

    it('should remove T-', function () {
        expect(target.abbreviate("T-Centralen")).toEqual("Centralen");
    });

    it('should abbreviate Väster', function () {
        expect(target.abbreviate("Västerhaninge")).toEqual("V‧haninge");
    });

    it('should abbreviate Flemings', function () {
        expect(target.abbreviate("Flemingsberg")).toEqual("F‧berg");
    });

    it('should perform multiple abbreviations', function () {
        expect(target.abbreviate("Upplands hamn")).toEqual("h");
    });
});
