// TODO store version of db
let wordlist=[]

const defaultList= [
  {
    id:0,
    from:'Mom',
    to:'мама',
    comment:'Familiar term used by children'
  },
  {
    id:1,
    from:'Dad',
    to:'папа',
    comment:'Familiar term used by children'
  },
]
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
export function addWordToList({from,to, comment}) {
  wordlist.push({
    from,
    to,
    comment,
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
