
export const wordMatch= search=>{
  search=search.toLowerCase()
  return ({from,to})=>(
    !search || from.toLowerCase().indexOf(search)!=-1 || to.toLowerCase().indexOf(search)!=-1
  )
}


