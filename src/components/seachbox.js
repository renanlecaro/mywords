import style from './searchbox.less'
import { h, Component } from 'preact';


export function SearchBox({value, save}) {
  return   <label className={style.searchBox}>
    <input
      placeholder={'Find or add a word'}
      type="text" value={value}
      onKeyUp={e=>save(e.target.value)}
      onChange={e=>save(e.target.value)}
    />
    <i className={'fa fa-search '} searchicon/>
    {!!value.length &&
        <i onClick={e=>{
          e.preventDefault()
          save('')
        }
        }
           className={'fa fa-times '} clearicon/>
    }
  </label>

}