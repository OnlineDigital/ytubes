"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const default_1 = require("../constants/default");
const shared_1 = require("../shared");
const parses_1 = require("../parses");
const __1 = require("..");
async function searchMusic(query, options) {
    var _a;
    if (!query) {
        throw new Error('Search query has empty');
    }
    const { max = default_1.defaultOptions.max, language = default_1.defaultOptions.language } = options;
    if ((0, shared_1.isYtURL)(query)) {
        const video = await (0, __1.getVideo)(query, { max: 1, language });
        query = ((_a = video[0]) === null || _a === void 0 ? void 0 : _a.title) || query;
    }
    default_1.ytMusicURL.search = `q=${query}`;
    const webPage = await (0, shared_1.fetch)(default_1.ytMusicURL, {
        headers: {
            ...default_1.headers,
            'Accept-Language': language
        }
    });
    const decodedWebPage = (0, shared_1.decodeHEX)(webPage);
    const renderer = (0, parses_1.getSearchData)(decodedWebPage, /"\}'\), data: '(.*)'\}\);ytcfg\.set/);
    if ((0, shared_1.isEmpty)(renderer))
        return [];
    const resultsData = (0, parses_1.extractMusicData)(renderer);
    const results = (0, shared_1.sliceResults)(resultsData, max);
    return results;
}
exports.default = searchMusic;
