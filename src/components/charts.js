import { h, Component } from 'preact';

import style from './charts.less'
import {getCatStats} from "../services/trainer";
import {Link} from "preact-router/match";


export class Charts extends Component{
  render(){
    return <div className={style.page}>

      <Link className={' button '} href={'/'}>
        <i className={'fa fa-angle-left'}/>
        <span>Word List</span>
      </Link>
      <BarChart
        data={getCatStats()}
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