import { h, Component } from 'preact';
import {getNextWordToTrain, registerResult} from "../services/trainer";
import {sameish} from "../services/sameish";
import {sayInRussian} from "../services/say";
import {ShowDiff} from "./diff";
import style from './miniform.less'
import {showToast} from "./notify";

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
  backToEdit=e=>{
    e.preventDefault()
    this.props.go('edit')
  }
  render({go}) {
    return <div className={style.this}>
      <button onClick={this.backToEdit}>‹ wordlist</button>
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

      {Question({word, value:answer, onKeyUp:setAnswer, onRef:n=>this.input=n})}

        <button className={'primary float-bottom'} type="submit">
          {answer ? 'Check' : 'I don\'t know'}
        </button>
      </form>
  }
}

export function Question({word, value, onKeyUp, onRef,showPlaceHolder}) {

    let parts=starsSplit(word.to)
    return <div className={style.fillTheBlank}>
      <span>{parts[0]}</span>
      <input type="text"
            placeHolder={showPlaceHolder?parts[1]:''}
             ref={onRef}
             style={{width:measureWidth(parts[1])}}
             value={value}
             onKeyUp={onKeyUp}
      />
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

        {/*<h1 className={'centered'}>"{word.from}"  is*/}
        {/*  <strong>*/}
        {/*    */}
        {/*  </strong> in russian </h1>*/}
        <label>Sorry that's wrong, it's <ShowDiff answer={answer} to={word.to}/></label>

        <h1>{word.from}</h1>

        {/*<label>Please type the correct answer below</label>*/}
        {Question({
          word,
          value:check,
          onKeyUp:e=>this.setState({check:e.target.value}),
          onRef:n=>this.input=n,
          showPlaceHolder:true
        })}
        <button  className={'primary float-bottom'} disabled={!this.isCorrect()}>Next word</button>
      </form>
    );
  }
}
