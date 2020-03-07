import { h, Component } from 'preact';
import {getNextWordToTrain, registerResult} from "../services/trainer";
import {sameish} from "../services/sameish";
import {sayInRussian} from "../services/say";
import {ShowDiff} from "./diff";
import style from './miniform.less'

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
    if(sameish(word.to,answer)){
      this.setState({
        mode:'correct'
      })
    }else{
      this.setState({
        mode:'incorrect'
      })
    }
  }
  validateSuccess=e=>{
    e.preventDefault()
    const {word} = this.state;
    this.setNewWord( registerResult({id:word.id,  guessed:true}) )
  }
  validateFailure=e=>{
    e.preventDefault()
    const {word} = this.state;
    this.setNewWord( registerResult({id:word.id,  guessed:false}) )
  }
  setAnswer=e=>{
    this.setState({answer:e.target.value})
  }
  renderByMode(){
    const {word,answer,mode} = this.state;
    if(!word) return 'loading'
    if(mode==='correct'){
      return <Bravo confirm={this.validateSuccess}/>
    }if(mode==='incorrect'){
      return <Nope answer={answer} word={word} confirm={this.validateFailure}/>
    }
    return <Ask word={word} answer={answer} setAnswer={this.setAnswer}
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
  render() {
    let {word, answer, setAnswer, onSubmitAnswer} = this.props;
    return  <form onSubmit={onSubmitAnswer}>
        <h1 className={'centered'}> How do you say
          <strong>{word.from}</strong>
          in russian ?</h1>
        <label>Please type the russian word below</label>
        <input type="text"
               ref={n=>this.input=n}
               value={answer}
               onKeyUp={setAnswer}
        />
        <button className={'primary float-bottom'} type="submit">
          {answer ? 'Check' : 'I don\'t know'}
        </button>
      </form>
  }
}

class Bravo extends Component{
  componentDidMount() {
    this.input.focus()
  }
  render({confirm}) {
    return <form  onSubmit={confirm}>
      <h1 className={'centered'}>Correct ! </h1>
      <button  className={'primary float-bottom'}
               ref={n=>this.input=n}  type={'submit'}>Next word</button>
    </form>
  }
}

class Nope extends Component{
  componentDidMount() {
    this.input.focus()
  }
  state={check:''}
  isCorrect(){
    return sameish(this.state.check,this.props.word.to)
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


        <h1 className={'centered'}>{word.from}  is
          <strong><ShowDiff answer={answer} to={word.to}/></strong> in russian </h1>

        <label>Please type the correct answer below</label>
        <input  type="text" ref={n=>this.input=n} value={check} placeholder={word.to} onKeyUp={e=>this.setState({check:e.target.value})}/>
        <button  className={'primary float-bottom'} disabled={!this.isCorrect()}>Next word</button>
      </form>
    );
  }
}
