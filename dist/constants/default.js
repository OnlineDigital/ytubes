"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ytMusicURL = exports.ytURL = exports.defaultOptions = exports.searchVideoTypes = exports.headers = void 0;
const url_1 = require("url");
exports.headers = {
    'Access-Control-Allow-Origin': '*',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:92.0) Gecko/20100101 Firefox/92.0'
};
exports.searchVideoTypes = {
    video: 'EgIQAQ==',
    channel: 'EgIQAg==',
    'channel-live': 'EgJAAQ==',
    playlist: 'EgIQAw==',
    movie: 'EgIQBA==',
    live: 'EgJAAQ=='
};
exports.defaultOptions = {
    type: 'video',
    language: 'en',
    max: 30
};
exports.ytURL = new url_1.URL('https://www.youtube.com/results');
exports.ytMusicURL = new url_1.URL('https://music.youtube.com/search');
