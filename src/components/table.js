import { h, Component } from 'preact';

export function Table({data, columns}) {
  return <table className={'mw-table'}>
    <thead>
      <tr>
      {columns.map(c=><th>{c.name}</th>)}
      </tr>
    </thead>
    <tbody>
    {data.map(row=>
      <tr>
        {columns.map(c=>
          <td>{c.value(row)}</td>
        )}
      </tr>
    )}
    </tbody>
  </table>
}