import { h, Component } from "preact";
import { Link } from "preact-router/match";
import { getWordList, updateWord } from "../services/trainer";

import VirtualList from "preact-virtual-list";
import style from "./edit.less";
import { SearchBox } from "./seachbox";
import { wordMatch } from "../services/wordMatch";
import { Add } from "./add";
import { catColor } from "../services/catColor";

import IconGithub from "@fortawesome/fontawesome-free/svgs/brands/github.svg";
import IconPlus from "@fortawesome/fontawesome-free/svgs/regular/plus-square.svg";
import IconChart from "@fortawesome/fontawesome-free/svgs/regular/chart-bar.svg";
import IconCog from "@fortawesome/fontawesome-free/svgs/solid/cog.svg";
import IconArrowUp from "@fortawesome/fontawesome-free/svgs/solid/arrow-up.svg";
import IconArrowRight from "@fortawesome/fontawesome-free/svgs/solid/arrow-right.svg";

export class Edit extends Component {
  state = {
    list: null,
    search: "",
  };
  componentDidMount() {
    this.clearListener = getWordList((list) => this.setState({ list }));
  }
  componentWillUnmount() {
    this.clearListener();
  }
  renderList() {
    const { list, search } = this.state;
    const filteredList = list.filter(wordMatch(search));
    if (!list.length && !search) {
      return (
        <div welcome-message>
          <IconArrowUp style={{ width: "2em" }} />
          <h1>Use the search to fill your list</h1>
        </div>
      );
    }

    return (
      <div className={"full-list"}>
        {filteredList.length && search ? (
          <label>Results in your list</label>
        ) : null}

        <VirtualList
          data={filteredList}
          rowHeight={60}
          renderRow={({ from, to, id, status }) => (
            <div className={style.word}>
              <div>
                <input
                  type={"text"}
                  className={"text-like"}
                  value={from}
                  onChange={(e) => updateWord(id, { from: e.target.value })}
                />
              </div>

              <span style={{ backgroundColor: catColor(status) }} />
              <div>
                <input
                  type={"text"}
                  className={"text-like ru-text"}
                  value={to}
                  onChange={(e) => updateWord(id, { to: e.target.value })}
                />
              </div>
            </div>
          )}
        />
        <Add clear={this.clear} search={search} list={list} />
      </div>
    );
  }
  clear = (e) => {
    e && e.preventDefault();
    this.setState({ search: "" });
    setTimeout(() => this.searchInput.focus(), 10);
  };

  renderFooter() {
    const { search, list } = this.state;
    if (search) {
      return (
        <footer>
          <button className={"button"} onClick={this.clear}>
            Clear search
          </button>
        </footer>
      );
    }
    return (
      <footer>
        <Link className={"button"} href={"/settings"}>
          <IconCog />
        </Link>
        <Link className={"button"} href={"/charts"}>
          <IconChart />
        </Link>{" "}
        <Link className={"button"} href={"/batch"}>
          <IconPlus />
        </Link>
        <a
          className={"button"}
          target={"blank"}
          href={"https://github.com/renanlecaro/mywords/"}
        >
          <IconGithub />
        </a>
        <div style={{ flexGrow: 1 }} />
        <Link className={"button"} href={"/train"} disabled={list.length < 2}>
          <span>Learn</span>
          <IconArrowRight />
        </Link>
      </footer>
    );
  }
  renderSearch() {
    const { search } = this.state;
    return (
      <SearchBox
        onRef={(n) => (this.searchInput = n)}
        clear={this.clear}
        value={search}
        save={(search) => this.setState({ search })}
      />
    );
  }
  render(props, { list, search }) {
    if (!list) return "loading";
    return (
      <div className={style.this}>
        {this.renderSearch()}
        {this.renderList()}
        {this.renderFooter()}
      </div>
    );
  }
}
