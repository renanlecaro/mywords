
import {wordMatch} from "./wordMatch"; 
import {sameish} from "./sameish";
import all from "./dicts/alltypes";
import common from "./dicts/common";

import uniqBy from 'lodash/uniqBy';

export const forAutocomplete=uniqBy(all.concat(common), w=>w.to)


let reject=[]


self.addEventListener('message', e=>{
  console.log('worker recieved',e.data)
  const {action, ...content}=e.data
  switch(action){
    case 'updateWords':
      return updateWords(content)
    case 'search':
      return search(content)
  }
})

function updateWords({banned}){
  reject=banned
}
function search({search,msgId}){

  const nodupes=forAutocomplete
    .filter(word=>!reject.find(rejected=>sameish(rejected, word.to)));

  firstX(nodupes, 10, wordMatch(search)  ,result=>{
    const resultMsg={
      action:'searchResult',
      result,msgId
    }
    console.log('worker posted',resultMsg)
    self.postMessage(resultMsg)
  })
}

function firstX(arr, count, test,cb, result=[], i=0) {

  const yieldAt= i+500
  while(i<arr.length && result.length<count && i<yieldAt){
    if(test(arr[i])){
      result.push(arr[i])
    }
    i++
  }
  if(i===yieldAt){
    setTimeout(()=>firstX(arr, count, test,cb, result, i), 10)
  }else{
    cb(result)
  }
}

