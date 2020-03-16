const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export function dateKey(time){
  const d=new Date(time)
  return months[d.getMonth()].slice(0,3) + ' '+ d.getDate()
}