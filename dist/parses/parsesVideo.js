"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractVideoData = void 0;
const shared_1 = require("../shared");
const utils_1 = require("./utils");
function extractVideoData(type, data, params = {}) {
    const contents = getContents(data);
    const results = contents === null || contents === void 0 ? void 0 : contents.map((renderer) => {
        if (type === 'video')
            return getVideoData(renderer === null || renderer === void 0 ? void 0 : renderer.videoRenderer);
        if (type === 'playlist')
            return getPlaylistData(renderer === null || renderer === void 0 ? void 0 : renderer.playlistRenderer);
        if (type === 'channel')
            return getChannelData(renderer === null || renderer === void 0 ? void 0 : renderer.channelRenderer);
        if (type === 'channel-live')
            return getChannelLiveData(renderer === null || renderer === void 0 ? void 0 : renderer.gridVideoRenderer, params);
        if (type === 'movie')
            return getVideoData(renderer === null || renderer === void 0 ? void 0 : renderer.videoRenderer);
        if (type === 'live')
            return getLiveData(renderer === null || renderer === void 0 ? void 0 : renderer.videoRenderer);
        return null;
    });
    return results.filter((item) => item !== null);
}
exports.extractVideoData = extractVideoData;
function getContents(dRender) {
    var _a;
    try {
        const sRender = (0, shared_1.findByKey)('itemSectionRenderer', dRender);
        const rRender = (0, shared_1.findByKey)('gridRenderer', dRender);
        if (rRender && rRender.items && rRender.items.length > 0) {
            return rRender.items;
        }
        const results = (_a = sRender.contents) === null || _a === void 0 ? void 0 : _a.filter((item) => {
            return (0, shared_1.findByKey)('videoRenderer', item) ||
                (0, shared_1.findByKey)('channelRenderer', item) ||
                (0, shared_1.findByKey)('playlistRenderer', item);
        });
        return results;
    }
    catch (err) {
        throw new Error('Error on get contents data');
    }
}
function getVideoData(vRender) {
    var _a, _b;
    try {
        const id = vRender === null || vRender === void 0 ? void 0 : vRender.videoId;
        return {
            id,
            type: 'video',
            title: (0, utils_1.compress)(vRender === null || vRender === void 0 ? void 0 : vRender.title),
            views: getVideoViews(vRender),
            duration: ((_a = vRender === null || vRender === void 0 ? void 0 : vRender.lengthText) === null || _a === void 0 ? void 0 : _a.simpleText) || '00:00',
            uploaded: ((_b = vRender === null || vRender === void 0 ? void 0 : vRender.publishedTimeText) === null || _b === void 0 ? void 0 : _b.simpleText) || (0, utils_1.unknown)('Date'),
            link: (0, utils_1.getVideoLink)(id),
            shareLink: (0, utils_1.getVideoLink)(id, true),
            channel: getChannelLink(vRender),
            thumbnail: (0, utils_1.getThumbnail)(id)
        };
    }
    catch (err) {
        throw new Error('Error on get video data');
    }
}
function getPlaylistData(pRender) {
    var _a;
    try {
        const id = pRender === null || pRender === void 0 ? void 0 : pRender.playlistId;
        const preview = (_a = pRender === null || pRender === void 0 ? void 0 : pRender.videos) === null || _a === void 0 ? void 0 : _a.map((dataRender) => {
            return getPlaylistVideoData(dataRender.childVideoRenderer);
        });
        return {
            id,
            type: 'playlist',
            title: getTitle(pRender),
            videoCount: getPlaylistCount(pRender),
            link: getPlaylistLink(id),
            channel: getChannelLink(pRender),
            thumbnail: (0, utils_1.getThumbnail)(preview[0].id),
            preview
        };
    }
    catch (err) {
        throw new Error('Error on get playlist data');
    }
}
function getPlaylistVideoData(pRender) {
    var _a;
    try {
        const id = pRender === null || pRender === void 0 ? void 0 : pRender.videoId;
        return {
            id,
            title: getTitle(pRender),
            duration: ((_a = pRender === null || pRender === void 0 ? void 0 : pRender.lengthText) === null || _a === void 0 ? void 0 : _a.simpleText) || '00:00',
            link: (0, utils_1.getVideoLink)(id),
            shareLink: (0, utils_1.getVideoLink)(id, true),
            thumbnail: (0, utils_1.getThumbnail)(id)
        };
    }
    catch (err) {
        throw new Error('Erro on get playlist videos');
    }
}
function getChannelData(cRender) {
    try {
        const id = cRender === null || cRender === void 0 ? void 0 : cRender.channelId;
        const channelEndLink = (0, shared_1.findByKey)('url', cRender.navigationEndpoint);
        const channelLink = channelEndLink && `https://www.youtube.com${channelEndLink}`;
        return {
            id,
            type: 'channel',
            name: getTitle(cRender, 'Name'),
            verified: getChannelVerified(cRender),
            link: channelLink || (0, utils_1.unknown)('Link')
        };
    }
    catch (err) {
        throw new Error('Error on get channel data');
    }
}
function getChannelLiveData(vRender, params = {}) {
    var _a;
    try {
        const { id, title, views, link, shareLink, thumbnail } = getVideoData(vRender);
        if (params.isLive) {
            // checking for live streams
            const labels = (0, shared_1.findByKey)('thumbnailOverlays', vRender);
            let isLive = false;
            if (labels && JSON.stringify(labels).indexOf('"label":"LIVE"') !== -1) {
                isLive = true;
            }
            if (!isLive)
                return null;
        }
        else {
            // checking for past live streams
            const publishedText = ((_a = vRender === null || vRender === void 0 ? void 0 : vRender.publishedTimeText) === null || _a === void 0 ? void 0 : _a.simpleText) || '';
            const isPast = publishedText.indexOf('Streamed') !== -1;
            if (!isPast)
                return null;
        }
        return {
            id,
            type: 'live',
            live: params.isLive || false,
            title,
            link,
            views,
            shareLink,
            channel: `https://www.youtube.com/channel/${params === null || params === void 0 ? void 0 : params.channelId}`,
            thumbnail
        };
    }
    catch (err) {
        throw new Error('Error on get channel data');
    }
}
function getLiveData(vRender) {
    try {
        const { id, title, channel, views, link, shareLink, thumbnail } = getVideoData(vRender);
        const badges = (0, shared_1.findByKey)('badges', vRender);
        let isLive = false;
        if (badges && JSON.stringify(badges).indexOf('"label":"LIVE NOW"') !== -1) {
            isLive = true;
        }
        return {
            id,
            type: 'live',
            live: isLive,
            title,
            link,
            views,
            shareLink,
            channel,
            thumbnail
        };
    }
    catch (err) {
        throw new Error('Error on get live data');
    }
}
function getTitle(dRender, keyName = 'Title') {
    var _a;
    const title = (_a = dRender === null || dRender === void 0 ? void 0 : dRender.title) === null || _a === void 0 ? void 0 : _a.simpleText;
    if (!title)
        return (0, utils_1.unknown)(keyName);
    return title;
}
function getChannelLink(cRender) {
    var _a, _b;
    const channel = (0, shared_1.findByKey)('url', (_b = (_a = cRender === null || cRender === void 0 ? void 0 : cRender.longBylineText) === null || _a === void 0 ? void 0 : _a.runs[0]) === null || _b === void 0 ? void 0 : _b.navigationEndpoint);
    if (!channel)
        return (0, utils_1.unknown)('Channel');
    return `https://www.youtube.com${channel}`;
}
function getChannelVerified(cRender) {
    var _a;
    const badges = ((_a = cRender === null || cRender === void 0 ? void 0 : cRender.ownerBadges) === null || _a === void 0 ? void 0 : _a.map((badge) => (0, shared_1.findByKey)('style', badge))) || [];
    return badges.includes('BADGE_STYLE_TYPE_VERIFIED') || badges.includes('BADGE_STYLE_TYPE_VERIFIED_ARTIST');
}
function getVideoViews(vRender) {
    var _a, _b, _c;
    let viewsText = ((_a = vRender === null || vRender === void 0 ? void 0 : vRender.viewCountText) === null || _a === void 0 ? void 0 : _a.simpleText) || '0';
    if (viewsText === '0') {
        viewsText = ((_c = (_b = vRender === null || vRender === void 0 ? void 0 : vRender.viewCountText) === null || _b === void 0 ? void 0 : _b.runs[0]) === null || _c === void 0 ? void 0 : _c.text) || '0';
    }
    return (0, shared_1.toNumber)(viewsText);
}
function getPlaylistLink(playlistId) {
    if (!playlistId)
        return (0, utils_1.unknown)('Link');
    return `https://www.youtube.com/playlist?list=${playlistId}`;
}
function getPlaylistCount(pRender) {
    const countText = (0, utils_1.compress)(pRender === null || pRender === void 0 ? void 0 : pRender.videoCountText) || '0';
    return (0, shared_1.toNumber)(countText);
}
