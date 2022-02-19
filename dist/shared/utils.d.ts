import { ObjectType } from '../types/shims';
export declare function isEmpty(object: ObjectType): boolean;
export declare function toNumber(text: string): number;
export declare function sliceResults<T>(arr: Array<T>, max?: number): Array<T>;
export declare function findByKey(key: string, object: ObjectType): any;
export declare function isYtURL(url: string): boolean;
export declare function decodeHEX(hex: string): string;
