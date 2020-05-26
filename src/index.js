import "./services/rollbar";
import { Edit } from "./components/edit";
import { Train } from "./components/train";
import { ToastDisplay } from "./components/notify";
import Router from "preact-router";
import { Settings } from "./components/settings";
import { Charts } from "./components/charts";
import "./index.less";
import { BatchAdd } from "./components/BatchAdd";
import { EditOne } from "./components/EditOne";
import { CustomFontImporter } from "./components/CustomFont";

export default function App() {
  return (
    <div id="app">
      <ToastDisplay />
      <CustomFontImporter />
      <Router>
        <Edit path="/" />
        <Train path="/train" />
        <Settings path="/settings" />
        <Charts path="/charts" />
        <BatchAdd path="/batch" />
        <EditOne path="/editOne/:id" />
      </Router>
    </div>
  );
}
