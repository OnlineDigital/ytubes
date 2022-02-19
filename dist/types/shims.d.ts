export declare type SearchVideoType = 'video' | 'channel' | 'channel-live' | 'playlist' | 'movie' | 'live';
export declare type SearchVideoTypes = Record<SearchVideoType, string>;
export declare type SearchMusicType = 'music';
export declare type SearchTypes = SearchVideoType | SearchMusicType;
export interface SearchOptions {
    type: SearchTypes;
    language?: string;
    max?: number;
}
export declare type Options = Omit<SearchOptions, 'type'>;
export declare type ObjectType = {
    [key: string]: any;
};
