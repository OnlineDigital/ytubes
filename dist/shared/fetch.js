"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = void 0;
const https_1 = require("https");
const url_1 = require("url");
function fetch(url, options = {}) {
    return new Promise((resolve, reject) => {
        if (typeof url === 'string') {
            url = new url_1.URL(url);
        }
        const opts = {
            protocol: url.protocol,
            hostname: url.hostname,
            path: url.pathname + url.search,
            ...options
        };
        (0, https_1.get)(opts, (res) => {
            res.setEncoding('utf-8');
            let data = '';
            res.on('data', chuck => {
                data += chuck;
            });
            res.on('end', () => {
                if (res.statusCode === 302) {
                    fetch(res.headers.location || '', options).then(resolve).catch(reject);
                }
                else {
                    resolve(data);
                }
            });
        }).on('error', error => reject(error));
    });
}
exports.fetch = fetch;
