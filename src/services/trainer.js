// TODO store version of db
let wordlist={
  from: 'en',
  to: 'ru',
  words:[
    {
      id:0,
      from:'Mom',
      to:'mama',
      comment:'Familiar term used by children'
    },
    {
      id:1,
      from:'Dad',
      to:'papa',
      comment:'Familiar term used by children'
    },
  ]
};

let trainingData = [
  {
    time:new Date(),
    id:0,
    guessed:false
  }
]
export function getWordList() {

}

export function getNextWordToTrain() {
  const index=trainingData.length%wordlist.words.length
  return  wordlist.words[index]
}

export function registerResult({id, guessed}) {
  trainingData.push({
    time:new Date(),
    id,
    guessed
  })
  return  getNextWordToTrain()
}
