import all from './dicts/alltypes'
import phrases from './dicts/phrases'
import common from './dicts/common'

import uniqBy from 'lodash/uniqBy';
import {getSetting} from "./settings";


export const forAutocomplete=uniqBy(all.concat(common), w=>w.to)

export function forAutoAdd(){
  switch (getSetting().whenEmptyList) {
    case 'add-word':
      return common.filter(w=>w.from.match(/noun|verb|adjective/)).concat(all)
    case 'add-sentence':
      return phrases
  }
}