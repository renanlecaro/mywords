// TODO store version of db
import {defaultWords} from "./defaultWords";

let wordlist=[]

const defaultList=defaultWords.map(({from,to}, id)=>({from,to,id}))
try{
  wordlist=JSON.parse(localStorage.getItem('wordlist')) || defaultList
}catch (e) {
  console.debug(e,'No saved word list')
  wordlist=defaultList
}

let trainingData = [
  {
    time:new Date(),
    id:0,
    guessed:false
  }
]

let  listeners=[]
export function getWordList(cb) {
  cb(wordlist)
  listeners.push(cb)
  return function clear() {
    listeners=listeners.filter(_cb=>_cb!==cb)
  }
}

function listChanged() {
  listeners.forEach(cb=>cb(wordlist))
  localStorage.setItem('wordlist',JSON.stringify(wordlist))
}
export function addWordToList({from,to }) {
  wordlist.push({
    from,
    to,
    id: Math.max(0,...wordlist.map(w=>w.id))
      +1
  })
  listChanged()
}

export function getNextWordToTrain() {
  const index=trainingData.length%wordlist.length
  return  wordlist[index]
}

export function registerResult({id, guessed}) {
  trainingData.push({
    time:new Date(),
    id,
    guessed
  })
  return  getNextWordToTrain()
}

