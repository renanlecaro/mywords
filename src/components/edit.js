import { h, Component } from 'preact';
import {addWordToList, getWordList} from "../services/trainer";
import {sameish} from "../services/sameish";
export class Edit extends Component{
  state={
    list:null
  }
  componentDidMount() {
    this.clearListener=getWordList(list=>this.setState({list}))
  }
  componentWillUnmount() {
    this.clearListener()
  }
  goToTraining=e=>{
    e.preventDefault()
    this.props.go('train')
  }
  render(props, {list}) {
    if(!list) return 'loading'
    return <div>

      <AddWord list={list}/>
      <h2>My words <button onClick={this.goToTraining}>Train</button></h2>
      <pre>{JSON.stringify(list, null,2)}</pre>
    </div>
  }
}

class AddWord extends Component{
  state={
    from:'',
    to:'',
    comment:''
  }
  onSubmit=e=>{
    e.preventDefault()
    if(this.problem()) return
    addWordToList(this.state)
    this.setState({
      from:'',
      to:'',
      comment:''
    })
  }
  problem=()=>{
    const {from,to} = this.state;
    const {list} = this.props;
    if(!from || !to) return 'Please write a word and its translation'
    if(sameish(from,to)) return  'Both words are the same ! '
    if(list.filter(w=>sameish(from, w.from) || sameish(to, w.to)).length){
      return 'This word is already in your list'
    }
  }
  render(props, {from,to,comment}){
    return <form onSubmit={this.onSubmit}>
      <h2>Add a word</h2>
      <p>English : <input value={from} onKeyUp={e=>this.setState({from:e.target.value})}/></p>
      <p>Russian : <input value={to} onKeyUp={e=>this.setState({to:e.target.value})}/></p>
      <p>Comment : <textarea value={comment} onKeyUp={e=>this.setState({comment:e.target.value})}/></p>
      {this.problem() && <p>{this.problem()}</p>}
      <button disabled={!!this.problem()}>Add</button>
    </form>
  }
}