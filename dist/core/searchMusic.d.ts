import { Music } from '../types/data';
import { Options } from '../types/shims';
declare function searchMusic(query: string, options: Options): Promise<Array<Music>>;
export default searchMusic;
