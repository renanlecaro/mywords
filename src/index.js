import "./services/rollbar";
import { Edit } from "./components/edit";
import { Train } from "./components/train";
import { ToastDisplay } from "./components/notify";
import Router from "preact-router";
import { Settings } from "./components/settings";
import "./index.less";
import { BatchAdd } from "./components/BatchAdd";
import { EditOne } from "./components/EditOne";
import "./db/db";
export default function App() {
  return (
    <div id="app">
      <ToastDisplay />
      <Router>
        <Edit path="/" />
        <Train path="/train" />
        <Settings path="/settings" />
        <BatchAdd path="/batch" />
        <EditOne path="/editOne/:id" />
      </Router>
    </div>
  );
}
