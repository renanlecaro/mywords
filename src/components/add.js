import { Component, h, Fragment } from "preact";
import { addWordToList, getWordList } from "../services/trainer";
import { sayInRussian } from "../services/say";
import { sameish, simplify } from "../services/sameish";
import style from "./edit.less";
import { showToast } from "./notify";
import { search } from "../services/search";
import debounce from "lodash/debounce";
import { wordMatch } from "../services/wordMatch";
import list from "less/lib/less/functions/list";
export class Add extends Component {
  state = {
    suggestions: [],
    searching: false,
  };

  componentWillReceiveProps({ search, list }) {
    if (search != this.props.search || list != this.props.list) {
      this.setState({
        suggestions: this.state.suggestions.filter(wordMatch(search)),
        searching: true,
      });
      this.suggestDelayed(search);
    }
  }
  componentDidMount() {
    this.suggest(this.props.search);
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.addWord(this.getFromTo());
  };

  getFromTo() {
    const { search } = this.props;
    const searchIsRU = isRussian(search);
    const inputVal = this.manualEntryInput.value;
    if (searchIsRU)
      return {
        from: inputVal,
        to: search,
      };

    return {
      from: search,
      to: inputVal,
    };
  }

  addWord({ from, to }) {
    if (this.problem({ from, to })) return alert(this.problem({ from, to }));
    addWordToList({
      from,
      to,
    });
    sayInRussian(to)();
    showToast('Word "' + to + '" added to your list');
    this.manualEntryInput.value = "";
    this.props.clear();
  }

  problem = ({ from, to }) => {
    const { list } = this.props;

    from = from || this.inputFrom.value;
    to = to || this.inputTo.value;

    if (!from || !to) return "Please write a word and its translation";
    if (sameish(from, to)) return "Both words are the same ! ";
    if (list.filter((w) => sameish(from, w.from) || sameish(to, w.to)).length) {
      return "Word already in your list";
    }
  };

  suggest = (str) => {
    search({ search: str, max: 10 }).then((result) => {
      this.setState({
        suggestions: result,
        searching: false,
      });
    });
  };

  suggestDelayed = debounce(this.suggest, 100);

  manualEntry() {
    const { search, list } = this.props;

    const present = list.find(
      ({ from, to }) => sameish(from, search) || sameish(to, search)
    );
    if (present) return null;

    const currentKey = isRussian(search) ? "to" : "from";

    return (
      <Fragment>
        <label suggestions-label>
          Manual entry{" "}
          {isRussian() ? "" : "(*star* a word to only ask for that word)"}
        </label>
        <form onSubmit={this.onSubmit} manual-entry>
          <input
            type={"text"}
            placeholder={
              (currentKey == "to" ? "English" : "Russian") +
              ' for "' +
              search +
              '"'
            }
            autoComplete={"off"}
            ref={(n) => (this.manualEntryInput = n)}
          />
          <button className={"primary"}>Add</button>
        </form>
      </Fragment>
    );
  }

  suggestionValid = ({ from, to }) => {
    return this.props.list.filter((w) => sameish(w.to, to)).length == 0;
  };
  render({ search, list }, { from, to, suggestions, searching }) {
    if (!search) return null;
    const validSuggestion = suggestions.filter(this.suggestionValid);

    return (
      <Fragment>
        {/*Shown above so that suggestions can lag*/}
        {this.manualEntry()}

        {validSuggestion.length ? (
          <label suggestions-label>Suggestions</label>
        ) : (
          ""
        )}
        {validSuggestion.map((s) => (
          <div className={style.suggestion} suggestion>
            <div>
              <div>{s.from}</div>
              <div>{s.to}</div>
            </div>
            <button
              className={"primary"}
              onClick={(e) => {
                e.preventDefault();
                this.addWord(s);
              }}
            >
              Add
            </button>
          </div>
        ))}
        {searching && (
          <label search-in-progress>Searching for matching words ...</label>
        )}
      </Fragment>
    );
  }
}

export function isRussian(string = "") {
  string = simplify(string);
  return (
    string.replace(
      /[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]/gi,
      ""
    ).length < Math.floor(string.length / 2)
  );
}
