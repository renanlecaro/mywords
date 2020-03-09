import {Component} from "preact";
import {addWordToList, getWordList} from "../services/trainer";
import {sayInRussian} from "../services/say";
import {sameish} from "../services/sameish";
import style from './miniform.less'
import {showToast} from "./notify";
import {suggestions} from "../services/suggest";
import debounce from 'lodash/debounce';
export class Add extends Component{
  state={
    from:'',
    to:'',
    list:[],
    suggestions:[]
  }
  componentDidMount() {
    this.clearListener=getWordList(list=>this.setState({list}))
  }
  componentWillUnmount() {
    this.clearListener()
  }

  onSubmit=e=>{
    e.preventDefault()
    if(this.problem()) return alert(this.problem())
    addWordToList(this.state)
    sayInRussian(this.state.to)
    showToast('Word "'+this.state.to+'" added to your list');
    this.setState({
      from:'',
      to:'',
      suggestions:[]
    })
  }
  problem=()=>{
    const {from,to,list} = this.state;

    if(!from || !to) return 'Please write a word and its translation'
    if(sameish(from,to)) return  'Both words are the same ! '
    if(list.filter(w=>sameish(from, w.from) || sameish(to, w.to)).length){
      return 'Word already in your list'
    }
  }
  backToEdit=e=>{
    e.preventDefault()
    this.props.go('edit')
  }
  suggest=(str)=>{
    this.setState({
      suggestions:suggestions(str)
    })
  }
  suggestDelayed=debounce(this.suggest, 300)
  textChange(change){
    this.setState(change)
    this.suggestDelayed(change.from || change.to)
  }
  render(props, {from,to,list,suggestions}){
    return  <div className={style.this}>
      <button onClick={this.backToEdit}>‹ wordlist ({list.length} words)</button>
      <form onSubmit={this.onSubmit} >
       <h1>Add a word</h1>
        <label htmlFor={'enterEnglish'}>English word</label>
        <input autoComplete={false} id={"enterEnglish"} type={'text'} placeholder={'English'} value={from} onKeyUp={e=>this.textChange({from:e.target.value})}/>
        <label htmlFor={'enterRussian'}>Russian translation to learn</label>
        <input autoComplete={false} id="enterRussian" type={'text'} placeholder={'Russian'} value={to} onKeyUp={e=>this.textChange({to:e.target.value})}/>
        {
          suggestions.map((s)=>
            <button onClick={e=>{
              this.setState(s,()=>this.onSubmit(e))
            }}>{s.from} -> {s.to}</button>
          )
        }
        <button className={'primary float-bottom'} id={'submitWord'}>Add</button>
      </form>
    </div>
  }
}