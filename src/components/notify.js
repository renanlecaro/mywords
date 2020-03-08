import {h,Component} from "preact";
import EventEmitter from 'events'
import style from './notify.less'
const toastEvents=new EventEmitter()

export class ToastDisplay extends Component{
  state={

  }
  componentDidMount() {
    toastEvents.on('toast', this.handleEvent)
  }
  componentWillUnmount() {
    toastEvents.off('toast', this.handleEvent)
  }
  timeoutNumber=null;
  handleEvent=({text, className})=>{
    this.setState({text, className})
    if(this.timeoutNumber!==null){
      clearTimeout(this.timeoutNumber)
    }
    this.timeoutNumber=setTimeout(
      ()=>{
        this.timeoutNumber=null;
        this.setState({text:''})
      },
      1500
    );
  }

  render(){
    const {text,className} = this.state;
    if(!text) return null;
    return <div className={style.this+' '+style[className]}>
      {text}
    </div>
  }
}

export function showToast(text, className='success') {
  toastEvents.emit('toast', {className, text})
}