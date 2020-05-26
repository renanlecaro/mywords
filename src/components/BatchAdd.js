import { Component } from "preact";
import { showToast } from "./notify";
import {
  importWords,
  removeAlreadyListedRussianWords,
} from "../services/backupAndLoad";
import { isRussian } from "./add";
import style from "./BatchAdd.less";
import { Link } from "preact-router/match";
import {
  checkStatusOfTranslator,
  translateWord,
} from "../services/autoTranslateList";
import { autoStar } from "../services/autoStart";

function splitUsing(val, regex) {
  return val
    .split(regex)
    .map((i) => i.trim())
    .filter((i) => i);
}
export class BatchAdd extends Component {
  state = {
    status: "",
    ru: "",
  };
  componentDidMount() {
    checkStatusOfTranslator().then((status) => this.setState({ status }));
  }

  render(props, { status, ru }, context) {
    if (status == "")
      return "Checking if automatic translation is avaliable ..";
    if (status == "offline") return <BatchManualAdd defaultRu={ru} />;
    if (status == "online")
      return (
        <AutoTranslator
          onError={(ru) => {
            this.setState({ ru, status: "offline" });
          }}
        />
      );
  }
}

class AutoTranslator extends Component {
  state = {
    to: "",
    words: [],
    loading: false,
  };
  onError() {
    showToast("Automatic translation failed, switching to manual");
    this.props.onError(this.state.to);
  }
  parseRaw = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    translateRawText(this.state.to).then(
      (words) => this.setState({ words: words.map(autoStar), loading: false }),
      (err) => {
        this.onError();
      }
    );
  };
  addCorrected = (e) => {
    e.preventDefault();
    importWords(this.state.words);
    this.setState({
      to: "",
      words: [],
      loading: false,
    });
  };
  render(props, { to, words }, context) {
    if (words.length)
      return (
        <ReviewScreen
          set={(c) => this.setState(c)}
          onSubmit={this.addCorrected}
          words={words}
        />
      );
    return (
      <InputRussianOnlyForm
        set={(c) => this.setState(c)}
        onSubmit={this.parseRaw}
        to={to}
      />
    );
  }
}

function ReviewScreen({ words, set, onSubmit }) {
  const change = (i, change) => {
    const newWords = [...words];
    newWords[i] = { ...newWords[i], ...change };
    set({ words: newWords });
  };
  return (
    <form onSubmit={onSubmit} className={style.this}>
      <h1>Review words translations</h1>
      {words.map((word, i) => (
        <div className={style.reviewRow}>
          <label>
            <span>En </span>
            <input
              type={"text"}
              value={word.from}
              onChange={(e) => change(i, { from: e.target.value })}
            />
          </label>

          <label>
            <span>Ru </span>
            <input
              type={"text"}
              value={word.to}
              className={"ru-text"}
              onChange={(e) => change(i, { to: e.target.value })}
            />
          </label>
        </div>
      ))}
      <button type={"submit"} className={"button"} style={{ float: "right" }}>
        <i className={"fa fa-plus"} />
        <span>Add to my list</span>
      </button>
    </form>
  );
}

function InputRussianOnlyForm({ to, onSubmit, set }) {
  return (
    <form onSubmit={onSubmit} className={style.this}>
      <h1>Batch add words</h1>
      <label>Russian words, one per line</label>
      <textarea value={to} onChange={(e) => set({ to: e.target.value })} />
      <button type={"submit"} className={"button"} style={{ float: "right" }}>
        <i className={"fa fa-plus"} />
        <span>Auto translate</span>
      </button>
    </form>
  );
}

function translateRawText(russianLines) {
  if (!isRussian(russianLines)) {
    return Promise.reject("Please type in russian here");
  }
  const lines = removeAlreadyListedRussianWords(
    splitUsing(russianLines, /\n/gi)
  );
  return Promise.all(lines.map(translateWord));
}

class BatchManualAdd extends Component {
  state = {
    from: "",
    to: "",
  };
  componentDidMount() {
    if (this.props.defaultRu) {
      this.setState({ to: this.props.defaultRu });
    }
  }

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
