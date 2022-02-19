"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.getMusic = exports.getLive = exports.getMovie = exports.getChannelPastLive = exports.getChannelLive = exports.getChannel = exports.getPlaylist = exports.getVideo = void 0;
const default_1 = require("./constants/default");
const searchVideo_1 = __importDefault(require("./core/searchVideo"));
const channelLive_1 = __importDefault(require("./core/channelLive"));
const searchMusic_1 = __importDefault(require("./core/searchMusic"));
const Options = {
    max: default_1.defaultOptions.max,
    language: default_1.defaultOptions.language
};
async function getVideo(query, options = Options) {
    const videos = await (0, searchVideo_1.default)(query, {
        type: 'video',
        ...options
    });
    return videos;
}
exports.getVideo = getVideo;
async function getPlaylist(query, options = Options) {
    const playlists = await (0, searchVideo_1.default)(query, {
        type: 'playlist',
        ...options
    });
    return playlists;
}
exports.getPlaylist = getPlaylist;
async function getChannel(query, options = Options) {
    const channels = await (0, searchVideo_1.default)(query, {
        type: 'channel',
        ...options
    });
    return channels;
}
exports.getChannel = getChannel;
async function getChannelLive(channelId, options = Options) {
    const lives = await (0, channelLive_1.default)(channelId, true, {
        type: 'channel-live',
        ...options
    });
    return lives;
}
exports.getChannelLive = getChannelLive;
async function getChannelPastLive(channelId, options = Options) {
    const lives = await (0, channelLive_1.default)(channelId, false, {
        type: 'channel-live',
        ...options
    });
    return lives;
}
exports.getChannelPastLive = getChannelPastLive;
async function getMovie(query, options = Options) {
    const movies = await (0, searchVideo_1.default)(query, {
        type: 'movie',
        ...options
    });
    return movies;
}
exports.getMovie = getMovie;
async function getLive(query, options = Options) {
    const lives = await (0, searchVideo_1.default)(query, {
        type: 'live',
        ...options
    });
    return lives;
}
exports.getLive = getLive;
async function getMusic(query, options = Options) {
    const musics = await (0, searchMusic_1.default)(query, options);
    return musics;
}
exports.getMusic = getMusic;
async function search(query, options) {
    const { type } = options;
    if (type === 'music') {
        return await (0, searchMusic_1.default)(query, options);
    }
    return await (0, searchVideo_1.default)(query, options);
}
exports.search = search;
