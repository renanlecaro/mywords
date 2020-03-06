import { h, Component } from 'preact';
import {Edit} from "./edit";
import {Train} from "./train";



export default class App extends Component {
  state={
    page:'train'
  }
  go=page=>{
    this.setState({page})
  }
	render() {
		return (
			<div id="app">
        {
          this.state.page == "edit" ?
          <Edit go={this.go}/> :
          <Train go={this.go}/>
        }
			</div>
		);
	}
}
