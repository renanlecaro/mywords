// TODO store version of db
import {defaultWords} from "./defaultWords";
import functionCaller from "less/lib/less/functions/function-caller";
let wordlist=[]

const defaultList=defaultWords.map(({from,to}, id)=>({from,to,id}))
try{
  wordlist=JSON.parse(localStorage.getItem('wordlist')) || defaultList
}catch (e) {
  console.debug(e,'No saved word list')
  wordlist=defaultList
}

let trainingData = [
  // {
  //   time:new Date(),
  //   index:0,
  //   id:0,
  //   guessed:false
  // }
]
try{
  trainingData=JSON.parse(localStorage.getItem('trainingData')) || []
}catch (e) {
  trainingData=[]
}


let stats={}

function analyseTrainingEvent({id, time, guessed,index} ){
  stats[id]=stats[id]||{
    guessCount:0,
    failCount:0,
    guessInARowCount:0,
    failInARowCount:0,
  }
  const s=stats[id]
  s.lastSeen=index

  if(guessed){
    s.guessCount++
    s.guessInARowCount++
    s.failInARowCount=0
  } else {
    s.failCount++
    s.guessInARowCount=0
    s.failInARowCount++
  }

  s.minStep= index+scheduleNext(s)
}

function scheduleNext({guessCount,
                        failCount,
                        guessInARowCount,
                        failInARowCount}){
  // Known from the start, ask 100 cards later, then 1000, etc ..
  if(!failCount){
    return Math.pow(10, 1+guessInARowCount)
  }

  // Learning and successfully guessed at least once, ask less and less often
  if(guessInARowCount){
    return Math.pow(5, guessInARowCount)
  }
  // Got it wrong once recently but overall knows it, ask again just after
  if(failInARowCount && guessCount>failCount){
    return 5
  }
  // Still learning, ask super often
  return 2
}

trainingData.forEach(analyseTrainingEvent)

let  listeners=[]
export function getWordList(cb) {
  cb(wordlist)
  listeners.push(cb)
  return function clear() {
    listeners=listeners.filter(_cb=>_cb!==cb)
  }
}

function listChanged() {
  wordlist=wordlist.filter(w=>w.to || w.from)
  listeners.forEach(cb=>cb(wordlist))
  localStorage.setItem('wordlist',JSON.stringify(wordlist))
}
export function addWordToList({from,to }) {
  wordlist=[{
    from,
    to,
    id: Math.max(0,...wordlist.map(w=>w.id))
      +1
  },...wordlist]
  listChanged()
}



export function getNextWordToTrain() {
  let currentStep=trainingData.length
  let stepped=wordlist
    .map(word=>{
      const stat=stats[word.id]
      return {
       ...word, minStep:stat && stat.minStep
      }
    })
    .filter(word=>!word.minStep || currentStep > word.minStep)


  let minStep=Math.min(...stepped.map(word=>word.minStep))
  if(minStep)
    return stepped.find(word=>word.minStep == minStep)
  else
    return stepped.find(word=>!word.minStep)


}

export function registerResult({id, guessed}) {
  const event={
    time:new Date(),
    id,
    guessed,
    index:trainingData.length
  }

  trainingData.push(event)
  analyseTrainingEvent(event)
  console.info(stats)
  localStorage.setItem('trainingData',JSON.stringify(trainingData))
  return  getNextWordToTrain()
}

export function updateWord(id, change) {
  wordlist=wordlist.map(item=>item.id==id ?
    {...item, ...change}:item);
  listChanged()
}
