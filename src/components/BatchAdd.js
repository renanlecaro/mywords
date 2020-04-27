import { Component } from "preact";
import { showToast } from "./notify";
import { importWords } from "../services/backupAndLoad";
import { isRussian } from "./add";
import style from "./BatchAdd.less";
import { Link } from "preact-router/match";
function splitUsing(val, regex) {
  return val
    .split(regex)
    .map((i) => i.trim())
    .filter((i) => i);
}
export class BatchAdd extends Component {
  state = {
    from: "",
    to: "",
  };
  onSubmit = (e) => {
    e.preventDefault();
    let { from, to } = this.state;
    if (isRussian(from) && !isRussian(to)) {
      // flipped lists, just adjust
      const temp = from;
      from = to;
      to = temp;
    }
    if (isRussian(from) || !isRussian(to)) {
      return showToast("The russian words seem in the wrong place");
    }

    let splitFrom = splitUsing(from, /\n/gi);
    let splitTo = splitUsing(to, /\n/gi);
    if (splitFrom.length !== splitTo.length)
      return showToast("Please add one translation per word");
    importWords(
      splitFrom.map((from, i) => ({
        from,
        to: splitTo[i],
      }))
    );
    this.setState({ from: "", to: "" });
  };
  render({}, { from, to }) {
    return (
      <form onSubmit={this.onSubmit} className={style.this}>
        <h1>Batch add words</h1>
        <label>Russian words, one per line</label>
        <textarea
          value={to}
          onChange={(e) => this.setState({ to: e.target.value })}
        />
        <label>English translations, one per line, in the same order</label>
        <textarea
          value={from}
          onChange={(e) => this.setState({ from: e.target.value })}
        />

        <button type={"submit"} className={"button"} style={{ float: "right" }}>
          <i className={"fa fa-plus"} />
          <span>Add words</span>
        </button>
      </form>
    );
  }
}
