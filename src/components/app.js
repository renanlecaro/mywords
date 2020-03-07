import { h, Component } from 'preact';
import {Edit} from "./edit";
import {Train} from "./train";
import {Add} from "./add";



export default class App extends Component {
  state={
    page:'train'
  }
  go=page=>{
    this.setState({page})
  }
  page(){
    switch (this.state.page) {
      case "edit":
        return Edit;
      case "train":
        return Train;
      case "add":
        return Add;

    }

  }
	render() {
		const Page=this.page()
    return (
			<div id="app">
        <Page go={this.go}/>
			</div>
		);
	}
}
