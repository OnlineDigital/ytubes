import { URL } from 'url'
import { SearchVideoTypes } from '../types/shims'

export const headers = {
  'Access-Control-Allow-Origin': '*',
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:92.0) Gecko/20100101 Firefox/92.0'
}

export const searchVideoTypes: SearchVideoTypes = {
  video: 'EgIQAQ==',
  channel: 'EgIQAg==',
  'channel-live': 'EgJAAQ==',
  playlist: 'EgIQAw==',
  movie: 'EgIQBA==',
  live: 'EgJAAQ=='
}

export const defaultOptions = {
  type: 'video',
  language: 'en',
  max: 30
}

export const ytURL = new URL('https://www.youtube.com/results')
export const ytMusicURL = new URL('https://music.youtube.com/search')
