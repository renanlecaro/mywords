import {h,Component,Fragment} from "preact";
import {getSetting, setSetting} from "../services/settings";

import { Link } from 'preact-router/match';
import {downloadBackup, restoreBackup} from "../services/backupAndLoad";
import style from './settings.less'
export class Settings extends Component {
  state=getSetting()
  change(key,value){
    this.setState({[key]:value})
    setSetting(key, value)
  }
  render(props, state, context) {
    const {whenEmptyList,useSounds,fullBackup,restoreProgress} = this.state;
    return <div settings  className={style.this}>

      <Link
        href={'/'}
        className={'button'} >
        <i className={'fa fa-angle-left'}/>
        <span>Word List</span>
      </Link>
      <form>
      <h2>List mastered</h2>
        <p>Whenever you guess a word right, we wait a bit before
          asking you about it again. If you've mastered all the words in your list
          but you keep training, we can either give you more words to learn or keep
          training already know words.
        </p>
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

        <h2>Audio</h2>
        <p>We use the text to speech engine of your device to playback words while you're
          learning them, but this might cut off your music if you like to train with music.
          For this reason, you might want to turn that feature off.
        </p>
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


        <h2>Backup</h2>
        <p>You want to change on which device you are training ?
          Then select "words and progress" below, generate your backup file, and load it
          on another device. If you just want to share your vocabulary list with a friend,
          select "just words" and they'll be able to import it to complete their existing
          list.
        </p>
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
      <button className={'primary'} onClick={e=>{
        e.preventDefault()
        downloadBackup(getSetting().fullBackup);
      }}>Download</button>


        <h2>Restore</h2>
        <p>If you restore a file that was exported with "only words" selected, then
          we'll just add the words to the list.
          If the file is a full backup, then you can choose to replace your current word
          list and progress with the ones from this file. You can also just extract the words
          from the backup. If a word is already present in your list, we won't touch it.
        </p>

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




        <h2>Reset app</h2>
        <p>This is the equivalent of uninstalling the app and reinstalling it.
          It will trigger a download of a full backup, so that you can recover your
          progress and word list if you made a mistake.
        </p>


      <button className={'primary'} onClick={e=>{
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
