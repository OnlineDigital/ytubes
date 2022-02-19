"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const default_1 = require("../constants/default");
const shared_1 = require("../shared");
const parses_1 = require("../parses");
async function channelLive(channelId, isLive, options) {
    if (!channelId) {
        throw new Error('Channel id is empty');
    }
    const { type = default_1.defaultOptions.type, max = default_1.defaultOptions.max, language = default_1.defaultOptions.language } = options;
    const liveCode = isLive ? '501' : '503';
    const channelUrl = new url_1.URL(`https://www.youtube.com/channel/${channelId}/videos?view=2&live_view=${liveCode}&ucbcb=1`);
    const webPage = await (0, shared_1.fetch)(channelUrl, {
        headers: {
            ...default_1.headers,
            'Accept-Language': language
        }
    });
    const renderer = (0, parses_1.getSearchData)(webPage, /var ytInitialData = (.*);<\/script>/);
    if ((0, shared_1.isEmpty)(renderer))
        return [];
    const resultsData = (0, parses_1.extractVideoData)(type, renderer, {
        channelId,
        isLive
    });
    const results = (0, shared_1.sliceResults)(resultsData, max);
    return results;
}
exports.default = channelLive;
