import { SearchOptions } from '../types/shims';
declare function channelLive<T>(channelId: string, isLive: boolean, options: SearchOptions): Promise<Array<T>>;
export default channelLive;
