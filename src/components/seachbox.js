import style from './edit.less'
import { h, Component } from 'preact';


export function SearchBox({value, save , onRef,clear}) {
  return   <label className={style.searchBox}>
    <input
      placeholder={'Find or add a word'}
      type="text" value={value}
      onKeyUp={e=>save(e.target.value)}
      onChange={e=>save(e.target.value)}
      ref={onRef}
    />
    <i className={'fa fa-search '} searchicon/>

  </label>

}