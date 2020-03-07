import { h, Component } from 'preact';
import {Edit} from "./components/edit";
import {Train} from "./components/train";
import {Add} from "./components/add";
import './index.less'

export default class App extends Component {
  state={
    page:'edit'
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
