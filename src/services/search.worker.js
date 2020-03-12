
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

let runningSeach=null
let timeoutToCancel=null
function search({search,msgId}){
  if(runningSeach){
    clearTimeout(timeoutToCancel)
    self.postMessage({
      action:'searchResult',
      result:null,
      msgId:runningSeach
    })
  }
  runningSeach=msgId

  const nodupes=forAutocomplete
    .filter(word=>!reject.find(rejected=>sameish(rejected, word.to)));

  firstX(nodupes, 10, wordMatch(search)  ,result=>{
    runningSeach=null

    const resultMsg={
      action:'searchResult',
      result,msgId
    }
    console.log('worker posted',resultMsg)
    self.postMessage(resultMsg)
  })
}


function firstX(arr, count, test,cb, result=[], i=0) {

  const yieldAt= i+100
  while(i<arr.length && result.length<count && i<yieldAt){
    if(test(arr[i])){
      result.push(arr[i])
    }
    i++
  }
  if(i===yieldAt){
    timeoutToCancel=setTimeout(()=>firstX(arr, count, test,cb, result, i),0)
  }else{
    cb(result)
  }
}

