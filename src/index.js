import './services/rollbar'
import {Edit} from "./components/edit";
import {Train} from "./components/train";
import {ToastDisplay} from "./components/notify";
import '@fortawesome/fontawesome-free/css/all.css'
import Router from 'preact-router';
import {Settings} from "./components/settings";
import {Charts} from "./components/charts";
import './index.less'

export default function App() {
  return (
    <div id="app"  >
      <ToastDisplay/>
      <Router>
        <Edit path="/"/>
        <Train path="/train"/>
        <Settings path="/settings"/>
        <Charts path="/charts"/>
      </Router>
    </div>
  );
}
