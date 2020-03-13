// TODO store version of db
import functionCaller from "less/lib/less/functions/function-caller";
import {showToast} from "../components/notify";

let wordlist=[]

import EventEmitter from 'events'
import {getWordToAddToList, tellWorkerAboutBanedWords} from "./suggest";
import {getSetting} from "./settings";
const events=new EventEmitter()

try{
  wordlist=JSON.parse(localStorage.getItem('wordlist')) || []
}catch (e) {
  console.debug(e,'No saved word list')
  wordlist=[]
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

  const delay=scheduleNext(s)
  s.minStep= index+delay
  return delay
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
  events.on('change',cb)
  cb(addMinStepToWordList())
  return function clear() {
    events.off('change',cb)
  }
}

function listChanged() {
  wordlist=wordlist.filter(w=>w.to || w.from)
  events.emit('change',addMinStepToWordList())
  localStorage.setItem('wordlist',JSON.stringify(wordlist))
  tellWorkerAboutBanedWords()
}
listChanged()

export function addWordToList({from,to }) {
  const word={
    from,
    to,
    id: Math.max(0,...wordlist.map(w=>w.id))
      +1,
    addedAt:new Date()
  }
  wordlist=[word,...wordlist]
  listChanged()
  return word
}


function addMinStepToWordList(){
  const currentStep=trainingData.length
  return wordlist
    .map(word=>{
      const stat=stats[word.id]
      return {
        ...word, minStep:stat && stat.minStep - currentStep
      }
    })
}

export function getNextWordToTrain() {

  let stepped=addMinStepToWordList()


  return (
    getWordAtMinStep(stepped.filter(word=>!word.minStep>0)) ||
    getNewWord(stepped)  ||
    addNewWord() ||
    getWordAtMinStep(stepped.filter(({id})=>id!==trainingData[trainingData.length-1].id))
  )


}

function getWordAtMinStep(list){
  if(!list.length) return null
  let minStep=Math.min(...list.map(word=>word.minStep))
  if(minStep){
    return list.find(word=>word.minStep == minStep)
  }
}

function getNewWord(list){
  const unseen=list.filter(word=>!word.minStep)
  return unseen[unseen.length-1]
}

function addNewWord(){
  if(getSetting().whenEmptyList!='rework'){
    return addWordToList(getWordToAddToList())
  }
}


export function registerResult({id, guessed,answer}) {
  const event={
    time:new Date(),
    id,
    guessed,
    index:trainingData.length,
    answer
  }

  trainingData.push(event)
  const delay=analyseTrainingEvent(event)
  if(getSetting().whenEmptyList!='rework'){
    showToast('We\'ll ask again in '+delay+' cards.')
  }
  localStorage.setItem('trainingData',JSON.stringify(trainingData))
  return  getNextWordToTrain()
}

export function updateWord(id, change) {
  wordlist=wordlist.map(item=>item.id==id ?
    {...item, ...change}:item);
  listChanged()
  showToast('Word updated')
}

export function getListOfRussianWords(){
  return wordlist.map(w=>w.to)
}