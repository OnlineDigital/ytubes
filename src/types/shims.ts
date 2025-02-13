export type SearchVideoType = 'video'
  | 'channel'
  | 'channel-live'
  | 'playlist'
  | 'movie'
  | 'live'

export type SearchVideoTypes = Record<SearchVideoType, string>

export type SearchMusicType = 'music'

export type SearchTypes = SearchVideoType | SearchMusicType

export interface SearchOptions {
  type: SearchTypes
  language?: string
  max?: number
}

export type Options = Omit<SearchOptions, 'type'>

export type ObjectType = {
  [key: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
}
