import { h, Component } from 'preact';
import {getNextWordToTrain, registerResult} from "../services/trainer";
export class Train extends Component{
  state={
  }
  setNewWord(word){
    this.setState({
      word:getNextWordToTrain(),
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
    return Ask({
      word,answer,
      setAnswer:this.setAnswer,
      onSubmitAnswer:this.onSubmitAnswer
    })
  }
  backToEdit=e=>{
    e.preventDefault()
    this.props.go('edit')
  }
  render({go}) {
    return <div>
      {this.renderByMode()}
      <button onClick={this.backToEdit}>Edit my wordlist</button>
    </div>
  }
}

function Ask({word,answer,setAnswer,onSubmitAnswer}) {
 return <div>
   <p> How do you say <strong>{word.from}</strong> in russian ?
   </p>
   <p>{word.comment}</p>
    <form onSubmit={onSubmitAnswer}>
      <input type="text"
             value={answer}
             onKeyUp={setAnswer}
      />
      <button type="submit">
        {answer ? 'Check':'I don\'t know'}
      </button>
    </form>
  </div>
}

function Bravo({confirm}) {
  return <div>
    Correct ! <button onClick={confirm}>Next word</button>
  </div>
}

class Nope extends Component{
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
      <form onSubmit={this.checkCorrectAnswerGiven}>

        {answer && <p>Sorry, that's wrong, it is not not <del>{answer}</del></p>}

        <p>{word.from}  is
          <strong>{word.to}</strong> in russian
        </p>

        <p>Please type the correct answer below</p>
        <input value={check} onKeyUp={e=>this.setState({check:e.target.value})}/>
        <button disabled={!this.isCorrect()}>Next word</button>
      </form>
    );
  }
}

function sameish(a,b) {
return simplify(a)==simplify(b)
}
function simplify(stringToCheck) {
  return stringToCheck.toLowerCase().trim()
}