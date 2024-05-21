const { describe } = require("mocha");
const assert = require('assert')
const { defaultFilters, composeFilter } = require('../src/index');

describe('defaultFilter', () => {
    describe('apply', () => {
        it('should return null', () => {
            const text = '3P';
            const filtered = defaultFilters.adultFilter.apply(text);
            assert.equal(filtered, null);
        });

        it('should return "こんにちは"', () => {
            const text = 'こんにちは';
            const filtered = defaultFilters.adultFilter.apply(text);
            assert.equal(filtered, text);
        });
    });

    describe('apply_replace', () => {
        it('should return ***をした', () => {
            const text = '3Pをした';
            const replaceValue = '***';
            const replaced = defaultFilters.adultFilter.apply_replce(text, replaceValue);
            assert.equal(replaced, '***をした');
        });

        it('should return 運動をした', () => {
            const text = '運動をした';
            const replaceValue = '***';
            const replaced = defaultFilters.adultFilter.apply_replce(text, replaceValue);
            assert.equal(replaced, '運動をした');
        });
    });
});

describe('violenceFilter', () => {
    describe('apply', () => {
        it('should return null', () => {
            const text = '恐喝';
            const filtered = defaultFilters.violenceFilter.apply(text);
            assert.equal(filtered, null);
        });

        it('should return "こんにちは"', () => {
            const text = 'こんにちは';
            const filtered = defaultFilters.violenceFilter.apply(text);
            assert.equal(filtered, text);
        });
    });

    describe('apply_replace', () => {
        it('should return ***をした', () => {
            const text = '恐喝をした';
            const replaceValue = '***';
            const replaced = defaultFilters.violenceFilter.apply_replce(text, replaceValue);
            assert.equal(replaced, '***をした');
        });

        it('should return 運動をした', () => {
            const text = '運動をした';
            const replaceValue = '***';
            const replaced = defaultFilters.violenceFilter.apply_replce(text, replaceValue);
            assert.equal(replaced, '運動をした');
        });
    });
});

describe('composeFilter', () => {
    it('should return null rejected by violenceFilter', () => {
        const filters = [ defaultFilters.adultFilter, defaultFilters.violenceFilter ];
        const text = '恐喝';
        const filtered = composeFilter(filters, text);
        assert.equal(filtered, null);
    });

    it('should return null rejected by adultFilter', () => {
        const filters = [ defaultFilters.adultFilter, defaultFilters.violenceFilter ];
        const text = '3P';
        const filtered = composeFilter(filters, text);
        assert.equal(filtered, null);
    });

    it('should return "こんにちは"', () => {
        const filters = [ defaultFilters.adultFilter, defaultFilters.violenceFilter ];
        const text = 'こんにちは';
        const filtered = composeFilter(filters, text);
        assert.equal(filtered, text);
    });
});
