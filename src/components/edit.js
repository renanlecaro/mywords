import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import {  getWordList, updateWord} from "../services/trainer";

import VirtualList from 'preact-virtual-list';
import style from './edit.less'
import {SearchBox} from "./seachbox";
import {wordMatch} from "../services/wordMatch";
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

       <VirtualList
         data={filteredList}
         rowHeight={40}
         renderRow={({from,to, id,minStep,status})=>
           <div className={style.word}>
             <div>
               <input type={'text'}
                      className={'text-like'}
                      value={from}
                      onChange={e=>updateWord(id, {from:e.target.value})}
               />
             </div>
             <div min-step className={status}></div>

             <div>
               <input type={'text'}
                      className={'text-like'}
                      value={to}
                      onChange={e=>updateWord(id, {to:e.target.value})}
               />
             </div>
           </div>}
       />
      <Add
        clear={this.clear} search={search} list={list}/>
    </div>
  }
  clear=(e)=>{
    e&&e.preventDefault()
    this.setState({search:''})
    setTimeout(()=>this.searchInput.focus(),10)
  }

  renderFooter(){
    const {search} = this.state
    if(search){
      return <footer>
        <button
          className={''}
          onClick={this.clear}>
          Clear search
        </button>
      </footer>
    }
    return <footer>

      <Link
        href={'/settings'}
        className={'button'} style={{marginRight:5}} >
        <i className={'fa fa-cog'}/>
      </Link>
      <Link
        href={'/charts'}
        className={'button'} style={{marginRight:5}}>
        <i className={'fa fa-chart-area'}/>
      </Link>      <Link
        href={'/batch'}
        className={'button'} >
        <i className={'fa fa-list'}/>
      </Link>


      <div style={{flexGrow:1}}/>
      <Link
          href={'/train'}
        className={'button primary'} >
        <span>Learn</span>
        <i className={'fa fa-angle-right'}/>
      </Link>
    </footer>
  }
  renderSearch(){
    const {search} = this.state
    return <SearchBox
      onRef={n=>this.searchInput=n}
      clear={this.clear}
      value={search} save={search=>this.setState({search})}/>
  }
  render(props, {list,search}) {
    if(!list) return 'loading'
    return <div className={ style.this}>
      {this.renderSearch()}
      {this.renderList()}
      {this.renderFooter()}
    </div>
  }
}
