"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeHEX = exports.isYtURL = exports.findByKey = exports.sliceResults = exports.toNumber = exports.isEmpty = void 0;
const default_1 = require("../constants/default");
function isEmpty(object) {
    return Object.keys(object).length === 0;
}
exports.isEmpty = isEmpty;
function toNumber(text) {
    const onlyNumberText = text.replace(/[^0-9]/g, '');
    return parseInt(onlyNumberText);
}
exports.toNumber = toNumber;
function sliceResults(arr, max = default_1.defaultOptions.max) {
    if (!arr)
        return [];
    return arr.slice(0, max);
}
exports.sliceResults = sliceResults;
/* eslint-disable @typescript-eslint/no-explicit-any */
function findByKey(key, object) {
    let value;
    if (!object)
        return undefined;
    Object.keys(object).some((k) => {
        if (k === key) {
            value = object[k];
            return true;
        }
        if (object[k] && typeof object[k] === 'object') {
            value = findByKey(key, object[k]);
            return value !== undefined;
        }
        return false;
    });
    return value;
}
exports.findByKey = findByKey;
function isYtURL(url) {
    url = url.replace(/\s+/g, ''); // remove spaces
    const pattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^"&?/\s]{11})/gi;
    return !!pattern.test(url);
}
exports.isYtURL = isYtURL;
function decodeHEX(hex) {
    return hex
        .replace(/\\x22/g, '"')
        .replace(/\\x7b/g, '{')
        .replace(/\\x7d/g, '}')
        .replace(/\\x5b/g, '[')
        .replace(/\\x5d/g, ']')
        .replace(/\\x3b/g, ';')
        .replace(/\\x3d/g, '=')
        .replace(/\\x27/g, '\'')
        .replace(/\\\\/g, 'doubleAntiSlash')
        .replace(/\\/g, '')
        .replace(/doubleAntiSlash/g, '\\');
}
exports.decodeHEX = decodeHEX;
