import { h, Component } from 'preact';
import {starsSplit} from "./train";
const jsdiff =require('diff') ;

export function ShowDiff({answer='', to='',isFillBlankMode}) {
  let parts=starsSplit(to)
  if(isFillBlankMode) return <span>
    <span>{parts[0]}</span>
    <strong>
    {
      jsdiff
        .diffChars(answer, parts[1], {ignoreCase: true})
        .filter(e=>!e.removed)
        .map(({added,  value})=>
          (added && <ins>{value}</ins>) ||  <span>{value}</span> )
    }</strong>
    <span>{parts[2]}</span>
  </span>
  return <strong>
    {
      jsdiff
        .diffChars(answer, to, {ignoreCase: true})
        .filter(e=>!e.removed)
        .map(({added,  value})=>
        (added && <ins>{value}</ins>) ||  <span>{value}</span> )
    }
  </strong>
}