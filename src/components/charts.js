import { h, Component } from 'preact';

import style from './charts.less'
import {getCatStats, getListOfRussianWords, getWordList} from "../services/trainer";
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
        columns={[ 'hot','learning','known'
        ]}
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
              return <div className={'train-'+column}
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
  barH(val){
    const {list} = this.state
    return (val/(list.length||1)*100)
  }
  render(){
    const {hot, learning, known} = this.state.stats;
    const P_new=(
      this.state.list.length - (hot+learning+known) )/
      this.state.list.length * 100;
    const P_learn = P_new+this.barH(hot);
    const P_known = P_learn+this.barH(learning);
    const background = `linear-gradient(
      #5eb3d9 0%,
      #0084c8 ${P_new.toFixed(2)}%,
      #005c94 ${P_learn.toFixed(2)}%,
      #0e232e ${P_known.toFixed(2)}%,
      #0e232e 100%
    )`.replace(/ *\n */gi, ' ');
    console.log(background)
    return <div className={style.statsBackground}
    style={{background}}/>
  }
}