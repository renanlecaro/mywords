import {Component} from "preact";
import {showToast} from "./notify";
import {importWords} from "../services/backupAndLoad";
import {isRussian} from "./add";
import style from './BatchAdd.less'
export class BatchAdd extends Component {
  state={
    from:'',
    to:''
  }
  onSubmit=e=>{
    e.preventDefault()
    let {from, to}=this.state;
    if(isRussian(from)&& !isRussian(to)){
      // flipped lists, just adjust
      const temp=from
      from=to
      to=temp
    }
    if(isRussian(from) || !isRussian(to)){
      return showToast('The russian words seem in the wrong place')
    }

    let splitFrom=from.split(/[,\n;]/gi).map(i=>i.trim()).filter(i=>i);
    let splitTo=to.split(/[,\n;]/gi).map(i=>i.trim()).filter(i=>i);
    if(splitFrom.length!==splitTo.length) return showToast('Please add one translation per word')
    importWords(splitFrom.map((from,i)=>({
      from,
      to:splitTo[i]
    })))
    this.setState({from:'', to:''})
  }
  render({}, {from,to}) {
    return <form onSubmit={this.onSubmit} className={style.this}>
      <h1>Batch add words</h1>
      <label>Russian words, comma separated</label>
      <textarea value={to} onChange={e=>this.setState({to:e.target.value})}/>
      <label>English translations, comma separated</label>
      <textarea value={from} onChange={e=>this.setState({from:e.target.value})}/>
      <button type={'submit'} className={'button primary'}>Add list of words</button>
    </form>
  }
}