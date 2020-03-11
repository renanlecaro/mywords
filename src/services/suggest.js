
import list from './dictionary'
import {getListOfRussianWords} from "./trainer";
import {sameish} from "./sameish";

export function getWordToAddToList(){
  const reject=getListOfRussianWords()
  return list.find(word=>!reject.find(rejected=>sameish(rejected, word.to)))
}

export function suggestions(search='', cb) {
  const reject=getListOfRussianWords()
  const nodupes=list.filter(word=>!reject.find(rejected=>sameish(rejected, word.to)))
  search=search.trim().toLowerCase()
  if(!search) return []
    return firstX(nodupes, 5, wordMatch(search)  ,cb
  )
}

export const wordMatch= search=>({from,to})=>(
  !search || from.toLowerCase().indexOf(search)!=-1 || to.toLowerCase().indexOf(search)!=-1
)


export function firstX(arr, count, test,cb, result=[], i=0) {
  const yieldAt= i+100
  while(i<arr.length && result.length<count && i<yieldAt){
    if(test(arr[i])){
      result.push(arr[i])
    }
    i++
  }
  if(i===yieldAt){
    firstX(arr, count, test,cb, result, i)
  }else{
    cb(result)
  }
}