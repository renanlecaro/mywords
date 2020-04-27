import { Component } from "preact";
import { catColor, getWordById, updateWord } from "../services/trainer";
import style from "./train.less";

export class EditOne extends Component {
  state = {};
  componentWillMount() {
    this.loadWord();
  }
  loadWord() {
    this.setState(getWordById(parseInt(this.props.id)));
  }
  save = (e) => {
    e.preventDefault();
    const { id, from, to } = this.state;
    updateWord(id, { from, to });
    history.back();
  };
  render(props, { from, to, status }, context) {
    return (
      <div className={style.this} style={{ backgroundColor: catColor(status) }}>
        <form onSubmit={this.save}>
          <h1>Quick editor</h1>
          <input
            type={"text"}
            value={from}
            placeholder={"English"}
            onChange={(e) => this.setState({ from: e.target.value })}
          />
          <input
            type={"text"}
            value={to}
            placeholder={"Russian"}
            onChange={(e) => this.setState({ to: e.target.value })}
          />
          <button className={" float-bottom"} type={"submit"}>
            Save
          </button>
        </form>
      </div>
    );
  }
}
