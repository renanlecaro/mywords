import { h, Component } from 'preact';
import {addWordToList, getWordList} from "../services/trainer";
import {sameish} from "../services/sameish";
import {sayInRussian} from "../services/say";
import {Table} from "./table";
import style from './edit.less'
export class Edit extends Component{
  state={
    list:null
  }
  componentDidMount() {
    this.clearListener=getWordList(list=>this.setState({list:list.reverse()}))
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
  render(props, {list}) {
    if(!list) return 'loading'
    return <div className={ style.this}>

      <h1>My {list.length} words
        <button className={'primary inline'} onClick={this.goToAdd}>Add</button>
      </h1>
      <Table data={list} columns={[
        {name:'English', value:l=>l.from},
        {name:'Russian', value:l=>l.to},
      ]}/>
      <footer>
      <button className={' primary'} onClick={this.goToTraining}>Start learning ›</button>
      </footer>
    </div>
  }
}
