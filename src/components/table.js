import { h, Component } from 'preact';
import style from './table.less'
export function Table({data, columns, hideHeader}) {
  return <table className={'mw-table '+style.this}>
    {!hideHeader &&
    <thead>
      <tr>
      {columns.map(c=><th>{c.name}</th>)}
      </tr>
    </thead>
    }
    <tbody>
    {data.map(row=>
      <tr>
        {columns.map(c=>
          <td>{c.render ? c.render(row)  : c.value(row)}</td>
        )}
      </tr>
    )}
    </tbody>
  </table>
}