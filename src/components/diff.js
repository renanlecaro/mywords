import { h, Component } from 'preact';
const jsdiff =require('diff') ;

export function ShowDiff({answer, to}) {

  return <span>
    {
      jsdiff
        .diffChars(answer, to, {ignoreCase: true})
        .map(({added, removed, value})=>
        (added && <ins>{value}</ins>) || (removed && <del>{value}</del>) || <span>{value}</span> )
    }
  </span>
}