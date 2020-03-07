import { h, Component } from 'preact';
import {addWordToList, getWordList, updateWord} from "../services/trainer";
import {sameish} from "../services/sameish";
import {sayInRussian} from "../services/say";
import {Table} from "./table";
import style from './edit.less'
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
  goToAdd=e=>{
    e.preventDefault()
    this.props.go('add')
  }
  columns(){
    return [
      {
        name:'English',
        value:l=>l.from,
        render({from, id}){
          return <input type={'text'}
            className={'text-like'}
            value={from}
                 onChange={e=>updateWord(id, {from:e.target.value})}
          />
        }
      },
      {
        name:'Russian',
        value:l=>l.to,
        render({to, id}){
          return <input type={'text'}
                        className={'text-like'}
                        value={to}
                        onChange={e=>updateWord(id, {to:e.target.value})}
          />
        }
      },
    ]
  }
  render(props, {list}) {
    if(!list) return 'loading'
    return <div className={ style.this}>

      <h1>My {list.length} words
        <button className={'primary inline'} onClick={this.goToAdd}>Add</button>
      </h1>
      <Table data={list} columns={this.columns()}/>
      <footer>
      <button className={' primary'} onClick={this.goToTraining}>Start learning ›</button>
      </footer>
    </div>
  }
}
