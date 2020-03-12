import all from './dicts/alltypes'
import phrases from './dicts/phrases'
import common from './dicts/common'

import {getSetting} from "./settings";


export function forAutoAdd(){
  switch (getSetting().whenEmptyList) {
    case 'add-word':
      return common.filter(w=>w.from.match(/noun|verb|adjective/)).concat(all)
    case 'add-sentence':
      return phrases
  }
}