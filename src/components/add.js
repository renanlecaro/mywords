import {Component} from "preact";
import {addWordToList, getWordList} from "../services/trainer";
import {sayInRussian} from "../services/say";
import {sameish} from "../services/sameish";
import style from './miniform.less'
import {showToast} from "./notify";
export class Add extends Component{
  state={
    from:'',
    to:'',
    comment:'',
    list:[]
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
      comment:''
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
  render(props, {from,to,comment, list}){
    return  <div className={style.this}>
      <button onClick={this.backToEdit}>‹ wordlist ({list.length} words)</button>
      <form onSubmit={this.onSubmit} >
       <h1>Add a word</h1>
        <label htmlFor={'enterEnglish'}>English word</label>
        <input id={"enterEnglish"} type={'text'} placeholder={'English'} value={from} onKeyUp={e=>this.setState({from:e.target.value})}/>
        <label htmlFor={'enterRussian'}>Russian translation to learn</label>
        <input id="enterRussian" type={'text'} placeholder={'Russian'} value={to} onKeyUp={e=>this.setState({to:e.target.value})}/>

        <button className={'primary float-bottom'} id={'submitWord'}>Add</button>
      </form>
    </div>
  }
}