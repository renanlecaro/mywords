import { Component } from "preact";
import {
  getNextWordToTrain,
  registerResult,
  sendToEndOfList,
} from "../services/trainer";
import { distance, sameish } from "../services/sameish";
import { sayInRussian } from "../services/say";
import { ShowDiff } from "./diff";
import style from "./train.less";

import { Link } from "preact-router/match";
import { StatsBackground } from "./charts";
import { getSetting } from "../services/settings";
import { catColor } from "../services/catColor";

export function starsSplit(word) {
  if (word.replace(/[^*]/gi, "").length != 2) {
    return ["", word, ""];
  }
  return (" " + word + " ").split("*").map((w) => (w == " " ? "" : w));
}

export class Train extends Component {
  state = {};
  setNewWord(word) {
    this.setState({
      word,
      mode: "ask",
      answer: "",
      typoWarning: false,
      typoContent: "",
      wordShownFirstAt: Date.now(),
    });
    this.speakNow = sayInRussian(word.to);
  }
  componentDidMount() {
    this.setNewWord(getNextWordToTrain());
  }

  onSubmitAnswer = (e) => {
    e.preventDefault();
    const {
      word,
      answer,
      typoWarning,
      wordShownFirstAt,
      typoContent,
    } = this.state;
    const target = starsSplit(word.to)[1];
    const typos = distance(answer, target);
    if (
      typos == 1 &&
      target.length > 3 &&
      word.status != 0 &&
      !typoWarning &&
      getSetting().warnTypo
    ) {
      return this.setState({
        typoWarning: true,
        typoContent: answer,
      });
    }
    this.speakNow();
    const guessed = sameish(answer, target);
    const { prevWord, nextWord } = registerResult({
      id: word.id,
      guessed,
      timing: Date.now() - wordShownFirstAt,
      typo: typoWarning ? typoContent : undefined,
    });
    this.nextWord = nextWord;
    this.setState({ word: prevWord }, () => {
      if (guessed) {
        this.setState({
          mode: "correct",
        });
        setTimeout(this.trainNextWord, 200);
      } else {
        this.setState({
          mode: "incorrect",
        });
      }
    });
  };

  trainNextWord = () => {
    this.setNewWord(this.nextWord);
    this.nextWord = null;
  };
  validateFailure = (e) => {
    e.preventDefault();
    this.trainNextWord();
  };
  setAnswer = (e) => {
    this.setState({ answer: e.target.value });
  };
  sendToEndOfList = (e) => {
    const { word, wordShownFirstAt } = this.state;
    e.preventDefault();
    sendToEndOfList(word.id);
    const { prevWord, nextWord } = registerResult({
      id: word.id,
      guessed: false,
      isSkip: true,
      timing: Date.now() - wordShownFirstAt,
    });
    this.nextWord = nextWord;
    this.trainNextWord();
  };
  renderByMode() {
    const { word, answer, mode, typoWarning } = this.state;

    if (mode === "incorrect") {
      return (
        <Nope
          answer={answer}
          word={word}
          confirm={this.validateFailure}
          sendToEndOfList={this.sendToEndOfList}
        />
      );
    }
    return (
      <Ask
        typoWarning={typoWarning}
        word={word}
        answer={answer}
        setAnswer={this.setAnswer}
        onSubmitAnswer={this.onSubmitAnswer}
        sendToEndOfList={this.sendToEndOfList}
      />
    );
  }
  render() {
    if (!this.state.word) return "loading";
    return (
      <div
        mode={this.state.mode}
        className={style.this}
        style={{ backgroundColor: catColor(this.state.word.status) }}
      >
        {this.renderByMode()}
      </div>
    );
  }
}

class Ask extends Component {
  autoFocus = () => {
    this.input.focus();
  };
  componentDidMount() {
    window.addEventListener("focus", this.autoFocus);
    this.autoFocus();
  }
  componentWillUnmount() {
    window.removeEventListener("focus", this.autoFocus);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.word.id != nextProps.word.id) {
      setTimeout(this.autoFocus);
    }
  }

  render() {
    let { word, answer, setAnswer, onSubmitAnswer, typoWarning } = this.props;
    return (
      <form onSubmit={onSubmitAnswer}>
        <h1>
          <Link href={"/editOne/" + word.id}>{word.from}</Link>
        </h1>

        {Question({
          word,
          value: answer,
          onKeyUp: setAnswer,
          onRef: (n) => (this.input = n),
        })}

        {typoWarning && <label>Please check for a typo</label>}

        <a
          className={"button delay float-bottom"}
          onClick={this.props.sendToEndOfList}
        >
          Learn later
        </a>
        <button className={" float-bottom"} type="submit">
          {answer ? "Check" : "I don't know"}
        </button>
      </form>
    );
  }
}

export function Question({ word, value, onKeyUp, onRef, placeHolder = "" }) {
  let parts = starsSplit(word.to);

  return (
    <div className={style.fillTheBlank}>
      <span className={"ru-text"}>{parts[0]}</span>
      <span input-placeholder-wrapper>
        <input
          type="text"
          className={"ru-text"}
          ref={onRef}
          value={value}
          onKeyUp={onKeyUp}
        />
        <span
          className={"ru-text"}
          style={{ opacity: placeHolder && !value ? 1 : 0 }}
        >
          {placeHolder || parts[1]}
        </span>
      </span>
      <span className={"ru-text"}>{parts[2]}</span>
    </div>
  );
}

class Nope extends Component {
  componentDidMount() {
    this.input.focus();
  }
  state = { check: "" };
  isCorrect() {
    const { word } = this.props;
    const target = starsSplit(word.to)[1];
    return sameish(this.state.check, target);
  }
  checkCorrectAnswerGiven = (e) => {
    e.preventDefault();
    if (this.isCorrect()) {
      this.props.confirm(e);
    }
  };
  render({ answer, word, confirm }, { check }) {
    let parts = starsSplit(word.to);
    return (
      <form onSubmit={this.checkCorrectAnswerGiven}>
        <h1>
          <Link href={"/editOne/" + word.id}>{word.from}</Link>
        </h1>

        {Question({
          word,
          value: check,
          onKeyUp: (e) => this.setState({ check: e.target.value }),
          onRef: (n) => (this.input = n),
          placeHolder: <ShowDiff answer={answer} to={parts[1]} />,
        })}
        <a
          className={"button delay float-bottom"}
          onClick={this.props.sendToEndOfList}
        >
          Learn later
        </a>
        <button className={"primary float-bottom"} disabled={!this.isCorrect()}>
          Next word
        </button>
      </form>
    );
  }
}
