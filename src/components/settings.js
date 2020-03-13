import {h,Component,Fragment} from "preact";
import {getSetting, setSetting} from "../services/settings";

import { Link } from 'preact-router/match';
import {downloadBackup, restoreBackup} from "../services/backupAndLoad";

export class Settings extends Component {
  state=getSetting()
  change(key,value){
    this.setState({[key]:value})
    setSetting(key, value)
  }
  render(props, state, context) {
    const {whenEmptyList,useSounds,fullBackup,restoreProgress} = this.state;
    return <div settings  style={{padding:20}}>

      <Link
        href={'/'}
        className={'button'} >
        <i className={'fa fa-angle-left'}/>
        <span>Word List</span>
      </Link>
      <form> 
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


      <label>Backup</label>
      <label>
        <input type={"radio"} name={'fullBackup'}
               checked={!fullBackup}
               onChange={e=>this.change('fullBackup',false)}/>
        just words
      </label>
      <label>
        <input type={"radio"} name={'fullBackup'}
               checked={fullBackup}
               onChange={e=>this.change('fullBackup',true)}/>
        words and progress
      </label>
      <button onClick={e=>{
        e.preventDefault()
        downloadBackup(getSetting().fullBackup);
      }}>Download</button>



      <label>Restore</label>
      <label>
        <input type={"radio"} name={'restoreProgress'}
               checked={!restoreProgress}
               onChange={e=>this.change('restoreProgress',false)}/>
        Only add missing words
      </label>
      <label>
        <input type={"radio"} name={'restoreProgress'}
               checked={restoreProgress}
               onChange={e=>this.change('restoreProgress',true)}/>
        Replace current state with backup
      </label>
      <input type={'file'} onChange={e=>{
        restoreBackup(e.target,getSetting().restoreProgress)
      }}/>





      <label>Reset the app (will store a full)</label>
      <button onClick={e=>{
        e.preventDefault()
        if(window.confirm('This will reset all your words and progress, are you sure ?')){

          downloadBackup(true)
          localStorage.clear()
          window.location.reload()
        }
      }}>Hard reset ...</button>
      </form>
    </div>
  }
}
