import { h, Component } from 'preact';

import style from './charts.less'
import {getCatStats, getListOfRussianWords, getWordList, wordCatsList} from "../services/trainer";
import {Link} from "preact-router/match";
import list from "less/lib/less/functions/list";


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
    return <div className={style.page}  >

      <BarChart
        data={this.state.stats}
        columns={wordCatsList}
      />
    </div>
  }
}
function BarChart({data,columns}) {
  const maxH=Math.max(...data.map(dat=>columns.map(col=>dat[col]).reduce((a,b)=>(a||0)+(b||0))))

  return <div className={style.graph}>
    {
      data.map(atTime=>{
        return <div>
          <span>{atTime.day}</span>
          <div>
          {
            columns.map(column=>{
              const percent=Math.round(atTime[column]/maxH*100)
              const abs=window.innerHeight * percent/100
              return <div status={ column}
                          style={{
                height:percent+'%'
              }}>
                  {abs > 20 && <span>{atTime[column]}</span>}
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
  barW(val){
    const {list} = this.state
    return (val/(list.length||1)*100)+'%'
  }
  height=window.innerHeight;
  render(){
    return <div className={style.statsBackground } status={this.props.status}
    >
      <div status={'0'}>
        {
          wordCatsList.map(s=>{
          const width=this.barW(this.state.stats[s])
           return  <span status={s}
                  style={{width}}/>
          })
        }
      </div>
    </div>

  }
}