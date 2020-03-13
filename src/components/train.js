import {   Component } from 'preact';
import {getNextWordToTrain, registerResult} from "../services/trainer";
import {sameish} from "../services/sameish";
import {sayInRussian} from "../services/say";
import {ShowDiff} from "./diff";
import style from './miniform.less'

import { Link } from 'preact-router/match';

export function starsSplit(word) {
  if(word.replace(/[^*]/gi,'').length!=2){
    return ['',word,'']
  }
  return (' '+word+' ').split('*').map(w=>w==' '?'':w)
}

export class Train extends Component{
  state={
  }
  setNewWord(word){
    this.setState({
      word,
      mode:'ask',
      answer:''
    })
  }
  componentDidMount() {
    this.setNewWord( getNextWordToTrain() )
  }


  onSubmitAnswer = e=>{
    e.preventDefault()
    const {word, answer} = this.state;
    sayInRussian(word.to)

    const target= starsSplit(word.to)[1]

    if(sameish(answer,target)){
      this.setNewWord( registerResult({id:word.id,  guessed:true}) )
    }else{
      this.setState({
        mode:'incorrect'
      })
    }
  }
  validateFailure=e=>{
    e.preventDefault()
    const {word,answer} = this.state;
    this.setNewWord(
      registerResult({id:word.id,  guessed:false, answer}) )
  }
  setAnswer=e=>{
    this.setState({answer:e.target.value})
  }
  renderByMode(){
    const {word,answer,mode} = this.state;
    if(!word) return 'loading'

    if(mode==='incorrect'){
      return <Nope answer={answer} word={word} confirm={this.validateFailure}
             />
    }
    return <Ask
      word={word} answer={answer} setAnswer={this.setAnswer}
      onSubmitAnswer={this.onSubmitAnswer}/>
  }
  render() {
    return <div className={style.this}>
      <Link className={' button '} href={'/'}>
        <i className={'fa fa-angle-left'}/>
        <span>Word List</span>
      </Link>
      {this.renderByMode()}
    </div>
  }
}

class Ask extends Component {
  componentDidMount() {
    this.input.focus()
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.word.id!=nextProps.word.id){
      setTimeout(()=>this.input.focus())
    }
  }

  render() {
    let {word, answer, setAnswer, onSubmitAnswer} = this.props;
    return  <form onSubmit={onSubmitAnswer}>
        <label>How do you say this in russian ?</label>

        <h1>{word.from}</h1>

      {Question({word, value:answer,
        onKeyUp:setAnswer,
        onRef:n=>this.input=n})}

        <button className={'primary float-bottom'} type="submit">
          {answer ? 'Check' : 'I don\'t know'}
        </button>
      </form>
  }
}

export function Question({word, value, onKeyUp,
                           onRef,placeHolder=''}) {

    let parts=starsSplit(word.to)

    return <div className={style.fillTheBlank}>
      <span>{parts[0]}</span>
      <span input-placeholder-wrapper>
        <input type="text"
               ref={onRef}
               style={{width:measureWidth(parts[1])}}
               value={value}
               onKeyUp={onKeyUp}
        />
        <span>{!value && placeHolder || ''}</span>
      </span>
      <span>{parts[2]}</span>
    </div>

}

export function measureWidth(text) {
  var block=document.createElement('DIV')
  block.innerText=text
  block.style.padding='10px 20px'
  block.style.fontSize='20px'
  block.style.lineHeight='20px'
  block.style.position='absolute'
  block.style.border='1px solid'
  block.style.left='-10000px'
  block.style.fontWeight='400'

  document.body.appendChild(block)
  const width= block.getBoundingClientRect().width
  document.body.removeChild(block)
  // Chrome still crops a bit for some reason
  return Math.floor(width)+20
}

class Nope extends Component{
  componentDidMount() {
    this.input.focus()
  }
  state={check:''}
  isCorrect(){
    const { word}=this.props;
    const target= starsSplit(word.to)[1]
    return sameish(this.state.check,target)
  }
  checkCorrectAnswerGiven=e=>{
    e.preventDefault()
    if(this.isCorrect()){
      this.props.confirm(e)
    }
  }
  render({answer, word, confirm}, {check}) {
    return (
      <form onSubmit={this.checkCorrectAnswerGiven}   >
        <label>It was <ShowDiff answer={answer} to={word.to}/></label>

        <h1>{word.from}</h1>


        {Question({
          word,
          value:check,
          onKeyUp:e=>this.setState({check:e.target.value}),
          onRef:n=>this.input=n,
          placeHolder:<ShowDiff answer={answer} to={word.to}/>
        })}
        <button  className={'primary float-bottom'} disabled={!this.isCorrect()}>Next word</button>
      </form>
    );
  }
}
