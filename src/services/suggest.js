
import {forAutoAdd,forAutocomplete} from './dictionary'
import {getListOfRussianWords} from "./trainer";
import {sameish} from "./sameish";



export function getWordToAddToList(){
  const reject=getListOfRussianWords()
  return forAutoAdd.find(word=>!reject.find(rejected=>sameish(rejected, word.to)))
}

export function suggestions(search='', cb) {
  const reject=getListOfRussianWords()
  const nodupes=forAutocomplete.filter(word=>!reject.find(rejected=>sameish(rejected, word.to)))
  search=search.trim().toLowerCase()
  if(!search) return ()=>null
  return firstX(nodupes, 5, wordMatch(search)  ,cb )
}

export const wordMatch= search=>({from,to})=>(
  !search || from.toLowerCase().indexOf(search)!=-1 || to.toLowerCase().indexOf(search)!=-1
)


const runs=[false]

export function firstX(arr, count, test,cb, result=[], i=0, parentOp=0) {
  let operationNumber;
  if(parentOp){
    operationNumber=parentOp
  }else {
    runs.push(true)
    operationNumber=runs.length-1
  }
  if(runs[operationNumber]==false) return console.log('Search cancelled')
  const yieldAt= i+100
  while(i<arr.length && result.length<count && i<yieldAt){
    if(test(arr[i])){
      result.push(arr[i])
    }
    i++
  }
  if(i===yieldAt){
    setTimeout(()=>firstX(arr, count, test,cb, result, i,operationNumber), 10)

  }else{
    cb(result)
  }
  if(!parentOp){
    return ()=>runs[operationNumber]=false
  }
}