import { SearchOptions } from '../types/shims';
declare function searchVideo<T>(query: string, options: SearchOptions): Promise<Array<T>>;
export default searchVideo;
