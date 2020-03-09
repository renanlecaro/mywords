import Fuse from 'fuse.js';
import list from './dictionary'

const fuse = new Fuse(list, {
  keys: ['from', 'to']
})

export function suggestions(search='') {
  if(search.length<3) return []
  // returns some suggestions for the search
  return fuse.search(search).slice(0,3)
}

