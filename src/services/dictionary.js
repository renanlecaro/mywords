import all from './dicts/alltypes'
import phrases from './dicts/phrases'
import common from './dicts/common'

import uniqBy from 'lodash/uniqBy';

export const forAutoAdd = phrases

export const forAutocomplete=uniqBy(all.concat(common), w=>w.to)

