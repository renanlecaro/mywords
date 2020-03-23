import { h, Component } from 'preact';

import style from './charts.less'
import {getCatStats, getListOfRussianWords, getWordList} from "../services/trainer";
import {Link} from "preact-router/match";


export class Charts extends Component{
  state={
    stats:[]
  }
  componentDidMount() {
    this.clear=getCatStats(stats=>this.setState({stats}))
  }
  componentWillUnmount() {
    this.clear()
  }


  render(){
    return <div className={style.page}>

      <Link className={' button '} href={'/'}>
        <i className={'fa fa-angle-left'}/>
        <span>Word List</span>
      </Link>
      <BarChart
        data={this.state.stats}
        columns={[,
          {name:'Known', key:'known'},
          {name:'Learning', key:'learning'},
          {name:'Hot', key:'hot'}
        ]}
      />
    </div>
  }
}

function BarChart({data,columns}) {
  const maxH=Math.max(...data.map(dat=>columns.map(col=>dat[col.key]).reduce((a,b)=>(a||0)+(b||0))))

  return <div className={style.graph}>
    {
      data.map(atTime=>{
        return <div>
          <span>{atTime.day}</span>
          <div>
          {
            columns.map(column=>{
              return <div className={'train-'+column.key} style={{
                width:Math.round(atTime[column.key]/maxH*100)+'%'
              }}>
                <span>{atTime[column.key]}</span>
              </div>
            })
          }</div>
        </div>
      })
    }
  </div>
}

export class StatsBackground extends Component{
  state={
    stats:{},
    list:[],
  }
  componentDidMount() {
    this.clear1=getCatStats(
      stats=>this.setState({stats:stats[stats.length-1]}))
    this.clear2=getWordList(list=>this.setState({list}))
  }
  componentWillUnmount() {
    this.clear1()
    this.clear2()
  }
  barH(val){
    const {list} = this.state
    return Math.round(val/(list.length||1)*100)+'%'
  }
  render(){
    const {hot, learning, known} = this.state.stats;
    return <div className={style.statsBackground}>
      <div className={'hot'} style={{height: this.barH(hot)}}/>
      <div className={'learning'} style={{height: this.barH(learning)}}/>
      <div className={'known'} style={{height: this.barH(known)}}/>
    </div>
  }
}