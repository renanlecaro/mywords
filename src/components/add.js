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
    const from=this.inputFrom.value,
      to=this.inputTo.value;
    this.addWord({from,to})

  }

  addWord({from,to}){
    if(this.problem({from,to})) return alert(this.problem({from,to}))
    addWordToList({
      from,
      to,
    })
    sayInRussian(to)
    showToast('Word "'+to+'" added to your list');
    this.inputFrom.value=''
    this.inputTo.value=''
    this.setState({
      suggestions:[]
    })
  }

  problem=({from,to})=>{
    const {list} = this.state;

    from=from||this.inputFrom.value;
      to=to||this.inputTo.value;

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
    suggestions(str, result=>{
      this.setState({
        suggestions:result
      })
    })
  }
  suggestDelayed=debounce(this.suggest, 100)

  render(props, {from,to,list,suggestions}){
    return  <div className={style.this}>
      <button onClick={this.backToEdit}>‹ wordlist ({list.length} words)</button>
      <form onSubmit={this.onSubmit} >
       <h1>Add a word</h1>
        <label htmlFor={'enterEnglish'}>English word</label>
        <input
          ref={n=>this.inputFrom=n}
          onKeyUp={e=>this.suggestDelayed(e.target.value)}
          autoComplete={'off'} id={"enterEnglish"} type={'text'} placeholder={'English'}
        />
        <label htmlFor={'enterRussian'}>Russian translation to learn</label>
        <input
          ref={n=>this.inputTo=n}
          autoComplete={'off'} id="enterRussian" type={'text'} placeholder={'Russian'}
          onKeyUp={e=>this.suggestDelayed(e.target.value)}
        />

        {
          suggestions.map((s)=>
            <div className={style.suggestion} onClick={e=>{
              e.preventDefault()
              this.addWord(s)
            }}><span>{s.from}</span><strong>{s.to}</strong></div>
          )
        }
        <button className={'primary float-bottom'} id={'submitWord'}>Add</button>
      </form>

    </div>
  }
}