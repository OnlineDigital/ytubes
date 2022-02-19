"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThumbnail = exports.getVideoLink = exports.unknown = exports.compress = exports.getSearchData = void 0;
function getSearchData(webPage, regex) {
    var _a;
    try {
        const data = ((_a = regex.exec(webPage)) === null || _a === void 0 ? void 0 : _a[1]) || '{}';
        const result = JSON.parse(data);
        return result;
    }
    catch (err) {
        throw new Error('Failed to parse YouTube search data. YouTube might have updated their site or no results returned.');
    }
}
exports.getSearchData = getSearchData;
function compress(key) {
    var _a;
    return (_a = key === null || key === void 0 ? void 0 : key.runs) === null || _a === void 0 ? void 0 : _a.map((v) => v.text).join('');
}
exports.compress = compress;
function unknown(keyName) {
    return `Unknown ${keyName}`;
}
exports.unknown = unknown;
function getVideoLink(videoId, short = false) {
    if (!videoId)
        return unknown('Link');
    return short ? `https://youtu.be/${videoId}` : `https://www.youtube.com/watch?v=${videoId}`;
}
exports.getVideoLink = getVideoLink;
function getThumbnail(id) {
    if (!id)
        return unknown('Thumbnail');
    return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}
exports.getThumbnail = getThumbnail;
