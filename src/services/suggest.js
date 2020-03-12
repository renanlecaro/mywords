
import {forAutoAdd} from './dictionary'
import {getListOfRussianWords} from "./trainer";
import {sameish} from "./sameish";

import Worker from 'worker-loader!./search.worker.js';


const worker = new Worker();

export function tellWorkerAboutBanedWords() {

  worker.postMessage({action:'updateWords', banned:getListOfRussianWords()});
}

export function getWordToAddToList(){
  const reject=getListOfRussianWords()
  return forAutoAdd()
    .find(word=>!reject.find(rejected=>sameish(rejected, word.to)))
}


let msgId=0
export function suggestions(search='', cb) {

  search=search.trim().toLowerCase()
  const currentMsgId=msgId++
  const onResult=ev=>{

    console.log('cb recieved',ev)
    if(ev.data.msgId==currentMsgId){
      ev.data.result && cb(ev.data.result)
      worker.removeEventListener("message", onResult);
    }
  }
  worker.addEventListener("message", onResult);
  worker.postMessage({action:'search',search,msgId:currentMsgId});

  //
}
