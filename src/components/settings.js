import {h,Component,Fragment} from "preact";
import {getSetting, setSetting} from "../services/settings";
import './settings.less'

export class Settings extends Component {
  state=getSetting()
  change(key,value){
    this.setState({[key]:value})
    setSetting(key, value)
  }
  render(props, state, context) {
    const {whenEmptyList,useSounds} = this.state;
    return <div settings>
      <h2>App settings</h2>
      <label>When out of new words to learn</label>
      <label>
        <input type={"radio"} name={'whenEmptyList'}
               checked={whenEmptyList==='add-word'}
               onChange={e=>this.change('whenEmptyList','add-word')}/>
        Add a common word to the list
      </label>
      <label>
        <input type={"radio"} name={'whenEmptyList'}
               checked={whenEmptyList==='add-sentence'}
               onChange={e=>this.change('whenEmptyList','add-sentence')}/>
        Add an idiomatic sentences
      </label>
      <label>
        <input type={"radio"} name={'whenEmptyList'}
               checked={whenEmptyList==='rework'}
               onChange={e=>this.change('whenEmptyList','rework')}/>
        Study already known words
      </label>

      <label>Read russian words out loud</label>
      <label>
        <input type={"radio"} name={'useSounds'}
               checked={useSounds}
               onChange={e=>this.change('useSounds',true)}/>
        On
      </label>
      <label>
        <input type={"radio"} name={'useSounds'}
               checked={!useSounds}
               onChange={e=>this.change('useSounds',false)}/>
        Off
      </label>

      <label>Reset the app (erases all content and progress)</label>
      <button onClick={e=>{
        e.preventDefault()
        if(window.confirm('This will reset all your words and progress, are you sure ?')){
          localStorage.clear()
          window.location.reload()
        }

      }}>Hard reset ...</button>
    </div>
  }
}