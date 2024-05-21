const fs = require('fs');
const readline = require('readline');
const path = require('path');

const dictPath = path.join(__dirname, '../', 'dict');

class Filter {
    /**@type {Array<String>} */
    keywords = [];

    constructor(keywords) {
        if(keywords && Array.isArray(keywords)) this.keywords = keywords;
    }

    /**
     *
     * @param {Array<String>} keywords
     */
    setKeywords(keywords) {
        this.keywords = keywords;
    }

    /**
     *
     * @param {String} text
     * @returns {String | null} filtered
     */
    apply(text) {
        if(!text) throw new Error('"text" is empty');

        const trimPattern = new RegExp('[(\\r)(\\n) 　]', 'g');
        for(const keyword of this.keywords) {
            const trimed = keyword.replace(trimPattern, '');
            if(text.includes(trimed)) return null;
        }

        return text;
    }

    /**
     *
     * @param {String} text
     * @param {String} replace
     * @returns {String} replaced
     */
    apply_replce(text, replaceValue) {
        if(!text) throw new Error('"text" is empty');
        if(!replaceValue) throw new Error('"replaceValue" is empty');

        try {
            const trimPattern = new RegExp('[(\\r)(\\n) 　]', 'g');
            for(const keyword of this.keywords) {
                const trimed = keyword.replace(trimPattern, '');

                const pattern = new RegExp(trimed, 'g');
                if(text.match(pattern)) {
                    const replaced = text.replace(pattern, replaceValue);
                    return replaced;
                }
            }

            return text;
        } catch (error) {
            throw error;
        }
    }
}
module.exports.Filter = Filter;

function createKeywords(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath)?.toString();
        const keywords = fileContent.split('\n');

        return keywords;
    } catch (error) {
        throw error;
    }
}

const adultPath = path.join(dictPath, 'adult.txt');
const adultKeywords = createKeywords(adultPath);
const adultFilter = new Filter(adultKeywords);

const violencePath = path.join(dictPath, 'violence.txt');
const violenceKeywords = createKeywords(violencePath);
const violenceFilter = new Filter(violenceKeywords);

const defaultFilters = { adultFilter, violenceFilter };
module.exports.defaultFilters = defaultFilters;

/**
 *
 * @param {Array<Filter>} filters
 * @param {String} text
 * @returns {String | null} filtered
 */
function composeFilter(filters, text) {
    try {
        for(const filter of filters) {
            const filtered = filter.apply(text);
            if(!filtered) return filtered;
        }

        return text;
    } catch (error) {
        throw error;
    }
}
module.exports.composeFilter = composeFilter;
