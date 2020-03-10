
import list from './dictionary'

export function suggestions(search='', cb) {
  search=search.trim().toLowerCase()
  if(!search) return []
  return firstX(list, 3, ({from,to})=>
    from.toLowerCase().indexOf(search)!=-1 ||
    to.toLowerCase().indexOf(search)!=-1
  ,cb
  )
}




export function firstX(list, count, test,cb, result=[], i=0) {
  const yieldAt= i+100
  while(i<list.length && result.length<count && i<yieldAt){
    if(test(list[i])){
      result.push(list[i])
    }
    i++
  }
  if(i===yieldAt){
    firstX(list, count, test,cb, result, i)
  }else{
    cb(result)
  }
}