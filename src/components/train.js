import {   Component } from 'preact';
import {catColor, getNextWordToTrain, registerResult} from "../services/trainer";
import {distance, sameish} from "../services/sameish";
import {sayInRussian} from "../services/say";
import {ShowDiff} from "./diff";
import style from './train.less'

import { Link } from 'preact-router/match';
import {StatsBackground} from "./charts";
import {getSetting} from "../services/settings";

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
      answer:'',
      typoWarning:false
    })
    this.speakNow=sayInRussian(word.to)
  }
  componentDidMount() {
    this.setNewWord( getNextWordToTrain() )
  }


  onSubmitAnswer = e=>{
    e.preventDefault()
    const {word, answer,typoWarning} = this.state;
    const target= starsSplit(word.to)[1]
    const typos = distance(answer,target)
    if(typos==1 && !typoWarning && getSetting().warnTypo){
      return this.setState({typoWarning:true})
    }
    this.speakNow()
    const guessed=sameish(answer,target)
    const {prevWord, nextWord}=
      registerResult({id:word.id,  guessed});
    this.nextWord=nextWord
    this.setState({word:prevWord}, ()=>{
      if(guessed){

        this.setState({
          mode:'correct'
        })
        setTimeout(this.trainNextWord,200)
      }else{
        this.setState({
          mode:'incorrect'
        })

      }
    })
  }
  trainNextWord=()=>{
    this.setNewWord(this.nextWord)
    this.nextWord=null
  }
  validateFailure=e=>{
    e.preventDefault()
    this.trainNextWord()
  }
  setAnswer=e=>{
    this.setState({answer:e.target.value})
  }
  renderByMode(){
    const {word,answer,mode,typoWarning} = this.state;

    if(mode==='incorrect'){
      return <Nope answer={answer} word={word} confirm={this.validateFailure}
             />
    }
    return <Ask
      typoWarning={typoWarning}
      word={word} answer={answer} setAnswer={this.setAnswer}
      onSubmitAnswer={this.onSubmitAnswer}/>
  }
  render() {
    if(!this.state.word) return 'loading'
    return <div
      mode={this.state.mode}
      className={style.this}
      style={{backgroundColor:catColor(this.state.word.status)}}>
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
    let {word, answer, setAnswer, onSubmitAnswer,typoWarning} = this.props;
    return  <form onSubmit={onSubmitAnswer} >

      <h1><Link href={"/editOne/"+word.id}>{word.from}</Link></h1>

      {Question({word, value:answer,
        onKeyUp:setAnswer,
        onRef:n=>this.input=n})}

      {typoWarning && <label>Please check for a typo</label>}
        <button className={' float-bottom'} type="submit">
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
               value={value}
               onKeyUp={onKeyUp}
        />
        <span
          style={{opacity:(placeHolder && !value)?1:0}}
        >{placeHolder || parts[1]}</span>
      </span>
      <span>{parts[2]}</span>
    </div>

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

    let parts=starsSplit(word.to)
    return (
      <form onSubmit={this.checkCorrectAnswerGiven}   >

        <h1><Link href={"/editOne/"+word.id}>{word.from}</Link></h1>


        {Question({
          word,
          value:check,
          onKeyUp:e=>this.setState({check:e.target.value}),
          onRef:n=>this.input=n,
          placeHolder:<ShowDiff answer={answer} to={parts[1]}/>
        })}
        <button  className={'primary float-bottom'} disabled={!this.isCorrect()}>Next word</button>
      </form>
    );
  }
}
