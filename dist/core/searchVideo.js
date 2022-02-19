"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const default_1 = require("../constants/default");
const shared_1 = require("../shared");
const parses_1 = require("../parses");
async function searchVideo(query, options) {
    if (!query) {
        throw new Error('Search query has empty');
    }
    const { type = default_1.defaultOptions.type, max = default_1.defaultOptions.max, language = default_1.defaultOptions.language } = options;
    const sp = (0, shared_1.findByKey)(type, default_1.searchVideoTypes);
    default_1.ytURL.search = `sp=${sp}&search_query=${query}`;
    const webPage = await (0, shared_1.fetch)(default_1.ytURL, {
        headers: {
            ...default_1.headers,
            'Accept-Language': language
        }
    });
    const renderer = (0, parses_1.getSearchData)(webPage, /var ytInitialData = (.*);<\/script>/);
    if ((0, shared_1.isEmpty)(renderer))
        return [];
    const resultsData = (0, parses_1.extractVideoData)(type, renderer);
    const results = (0, shared_1.sliceResults)(resultsData, max);
    return results;
}
exports.default = searchVideo;
