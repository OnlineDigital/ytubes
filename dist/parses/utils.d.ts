import { ObjectType } from '../types/shims';
export declare function getSearchData(webPage: string, regex: RegExp): ObjectType;
export declare function compress(key: ObjectType): string;
export declare function unknown(keyName: string): string;
export declare function getVideoLink(videoId: string, short?: boolean): string;
export declare function getThumbnail(id: string): string;
