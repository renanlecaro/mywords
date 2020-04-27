import { h, Component } from "preact";

import style from "./charts.less";
import {
  catColor,
  getCatStats,
  getListOfRussianWords,
  getWordList,
  wordCatsList,
} from "../services/trainer";
import { Link } from "preact-router/match";
import list from "less/lib/less/functions/list";

export class Charts extends Component {
  state = {
    stats: null,
  };
  componentDidMount() {
    this.clear = getCatStats((stats) => this.setState({ stats }));
  }
  componentWillUnmount() {
    this.clear();
  }
  scrollLeft = () => {
    if (this.page) {
      this.page.scrollTo(this.page.scrollWidth, 0);
    }
  };
  render() {
    if (!this.state.stats) return "Loading";
    setTimeout(this.scrollLeft);
    return (
      <div className={style.page} ref={(n) => (this.page = n)}>
        <BarChart data={this.state.stats} columns={wordCatsList} />
      </div>
    );
  }
}
function BarChart({ data, columns, done }) {
  const maxH = Math.max(
    ...data.map((dat) =>
      columns.map((col) => dat[col]).reduce((a, b) => (a || 0) + (b || 0))
    )
  );
  return (
    <div className={style.graph}>
      {data.map((atTime) => {
        return (
          <div>
            <span>{atTime.day}</span>
            <div>
              {columns.map((column) => {
                const percent = Math.round((atTime[column] / maxH) * 100);
                const abs = (window.innerHeight * percent) / 100;
                return (
                  <div
                    style={{
                      height: percent + "%",
                      backgroundColor: catColor(column),
                    }}
                  >
                    {abs > 20 && <span>{atTime[column]}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
