import { h, Component } from 'preact';
import {addWordToList, getWordList, updateWord} from "../services/trainer";
import {sameish} from "../services/sameish";
import {sayInRussian} from "../services/say";
import {Table} from "./table";
import style from './edit.less'
import {SearchBox} from "./seachbox";
import {wordMatch} from "../services/suggest";
import {Add} from "./add";
export class Edit extends Component{
  state={
    list:null,
    search:''
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
  renderList(){
    const {list,search}=this.state;
    const filteredList=list.filter(wordMatch(search))
    if(!list.length && !search){
      return <div welcome-message>
        <i className={'fa fa-caret-up'}/>
        <h1>Use the search to fill your list</h1>
      </div>
    }
   return  <div className={'full-list'}>
      {filteredList.length && search ? <label>Results in your list</label>:null}
      {
        filteredList.map(({from,to, id})=>
          <div className={style.word}>
            <div>
              <input type={'text'}
                     className={'text-like'}
                     value={from}
                     onChange={e=>updateWord(id, {from:e.target.value})}
              />
            </div>
            <div>
              <input type={'text'}
                     className={'text-like'}
                     value={to}
                     onChange={e=>updateWord(id, {to:e.target.value})}
              />
            </div>
          </div>
        )
      }
      <Add search={search} list={list}/>
    </div>
  }
  render(props, {list,search}) {
    if(!list) return 'loading'
    return <div className={ style.this}>
      <SearchBox value={search} save={search=>this.setState({search})}/>

      {this.renderList()}

      <button onClick={e=>{
        e.preventDefault()
        if(window.confirm('This will reset all your words and progress, are you sure')){
          localStorage.clear()
          window.location.reload()
        }

      }}>Reset app state to default</button>
      <footer>
      <button className={' primary'} onClick={this.goToTraining}>Start learning ›</button>
      </footer>

    </div>
  }
}
