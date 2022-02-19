/// <reference types="node" />
import { URL } from 'url';
import { SearchVideoTypes } from '../types/shims';
export declare const headers: {
    'Access-Control-Allow-Origin': string;
    'User-Agent': string;
};
export declare const searchVideoTypes: SearchVideoTypes;
export declare const defaultOptions: {
    type: string;
    language: string;
    max: number;
};
export declare const ytURL: URL;
export declare const ytMusicURL: URL;
