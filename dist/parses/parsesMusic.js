"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractMusicData = void 0;
const shared_1 = require("../shared");
const utils_1 = require("./utils");
function extractMusicData(renderer) {
    const contents = getContents(renderer);
    const results = contents === null || contents === void 0 ? void 0 : contents.map((data) => {
        return getMusicData(data.musicResponsiveListItemRenderer);
    });
    return results;
}
exports.extractMusicData = extractMusicData;
function getContents(dRender) {
    try {
        const sRender = (0, shared_1.findByKey)('sectionListRenderer', dRender);
        const mRender = sRender === null || sRender === void 0 ? void 0 : sRender.contents.filter((data) => {
            return (0, shared_1.findByKey)('bottomEndpoint', data);
        });
        const cRender = mRender.filter((data) => {
            return (0, shared_1.findByKey)('contents', data);
        });
        const vRender = cRender.filter((data) => {
            return (0, shared_1.findByKey)('videoId', data);
        });
        const contents = (0, shared_1.findByKey)('contents', vRender[0]);
        return contents;
    }
    catch (err) {
        throw new Error('Error on get contents data');
    }
}
function getMusicData(dRender) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        const mRenderLeft = (_c = (_b = (_a = dRender === null || dRender === void 0 ? void 0 : dRender.flexColumns[0]) === null || _a === void 0 ? void 0 : _a.musicResponsiveListItemFlexColumnRenderer) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.runs[0];
        const mRenderRight = (_f = (_e = (_d = dRender === null || dRender === void 0 ? void 0 : dRender.flexColumns[1]) === null || _d === void 0 ? void 0 : _d.musicResponsiveListItemFlexColumnRenderer) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.runs;
        const mRenderRightData = mRenderRight.filter((data) => {
            return (0, shared_1.findByKey)('browseId', data);
        });
        const id = (0, shared_1.findByKey)('videoId', mRenderLeft);
        const channelID = (0, shared_1.findByKey)('browseId', mRenderRightData[0]);
        return {
            id,
            type: 'music',
            title: (mRenderLeft === null || mRenderLeft === void 0 ? void 0 : mRenderLeft.text) || (0, utils_1.unknown)('Title'),
            artist: ((_g = mRenderRightData[0]) === null || _g === void 0 ? void 0 : _g.text) || (0, utils_1.unknown)('Artist'),
            album: ((_h = mRenderRightData[1]) === null || _h === void 0 ? void 0 : _h.text) || (0, utils_1.unknown)('Album'),
            duration: ((_j = mRenderRight[mRenderRight.length - 1]) === null || _j === void 0 ? void 0 : _j.text) || '00:00',
            link: getMusicLink(id),
            videoLink: (0, utils_1.getVideoLink)(id),
            channel: getChannelLink(channelID),
            thumbnail: (0, utils_1.getThumbnail)(id),
            explicit: getExplicit(dRender)
        };
    }
    catch (err) {
        throw new Error('Error on get music data');
    }
}
function getMusicLink(musicID) {
    if (!musicID)
        return (0, utils_1.unknown)('Link');
    return `https://music.youtube.com/watch?v=${musicID}`;
}
function getChannelLink(channelID) {
    if (!channelID)
        return (0, utils_1.unknown)('Channel');
    return `https://music.youtube.com/channel/${channelID}`;
}
function getExplicit(dRender) {
    const badges = (0, shared_1.findByKey)('iconType', dRender === null || dRender === void 0 ? void 0 : dRender.badges);
    return badges === 'MUSIC_EXPLICIT_BADGE';
}
