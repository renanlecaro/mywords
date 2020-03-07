import { h, Component } from 'preact';
const jsdiff =require('diff') ;

export function ShowDiff({answer, to}) {

  return <span>
    {
      jsdiff
        .diffChars(answer, to, {ignoreCase: true})
        .filter(e=>!e.removed)
        .map(({added,  value})=>
        (added && <ins>{value}</ins>) ||  <span>{value}</span> )
    }
  </span>
}