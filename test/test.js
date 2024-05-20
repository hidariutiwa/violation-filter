const { describe } = require("mocha");
const assert = require('assert')
const { defaultFilter } = require('../src/index');

describe('defaultFilter', () => {
    describe('apply', () => {
        it('should return null', () => {
            const text = '3P';
            const filtered = defaultFilter.adultFilter.apply(text);
            assert.equal(filtered, null);
        });

        it('should return "こんにちは"', () => {
            const text = 'こんにちは';
            const filtered = defaultFilter.adultFilter.apply(text);
            assert.equal(filtered, text);
        });
    });

    describe('apply_replace', () => {
        it('should return ***をした', () => {
            const text = '3Pをした';
            const replaceValue = '***';
            const replaced = defaultFilter.adultFilter.apply_replce(text, replaceValue);
            assert.equal(replaced, '***をした');
        });

        it('should return 運動をした', () => {
            const text = '運動をした';
            const replaceValue = '***';
            const replaced = defaultFilter.adultFilter.apply_replce(text, replaceValue);
            assert.equal(replaced, '運動をした');
        });
    });
});

describe('violenceFilter', () => {
    describe('apply', () => {
        it('should return null', () => {
            const text = '恐喝';
            const filtered = defaultFilter.violenceFilter.apply(text);
            assert.equal(filtered, null);
        });

        it('should return "こんにちは"', () => {
            const text = 'こんにちは';
            const filtered = defaultFilter.violenceFilter.apply(text);
            assert.equal(filtered, text);
        });
    });

    describe('apply_replace', () => {
        it('should return ***をした', () => {
            const text = '恐喝をした';
            const replaceValue = '***';
            const replaced = defaultFilter.violenceFilter.apply_replce(text, replaceValue);
            assert.equal(replaced, '***をした');
        });

        it('should return 運動をした', () => {
            const text = '運動をした';
            const replaceValue = '***';
            const replaced = defaultFilter.violenceFilter.apply_replce(text, replaceValue);
            assert.equal(replaced, '運動をした');
        });
    });
});