import { Component } from "preact";
import {
  getNextWordToTrain,
  registerResult,
  sendToEndOfList,
} from "../services/trainer";
import { decompose, distance, sameish, starsSplit } from "../services/sameish";
import { sayInRussian } from "../services/say";
import { ShowDiff } from "./diff";
import style from "./train.less";

import { Link } from "preact-router/match";
import { catColor } from "../services/catColor";
import { debugLog } from "../db/db";

export class Train extends Component {
  state = {};
  setNewWord(word) {
    const { parts, recompose } = decompose(word.to);
    this.recompose = recompose;
    this.setState({
      word,
      mode: "ask",
      parts,
      answers: parts.filter((p) => p.type == "input").map(() => ""),
      typoWarning: false,
      typoContent: "",
      wordShownFirstAt: Date.now(),
      placeHolders: [],
    });
    this.speakNow = sayInRussian(word.to);
    debugLog(word.to);
  }
  componentDidMount() {
    this.setNewWord(getNextWordToTrain());
  }

  answerDistance() {
    const { word, answers } = this.state;
    const target = word.to.replace(/\*/gi, "");
    const answer = this.recompose(answers);
    return distance(answer, target);
  }

  reportTypo() {
    const { word, typoWarning, answers } = this.state;
    if (this.answerDistance() == 1 && word.status != 0 && !typoWarning) {
      this.setState({
        typoWarning: true,
        typoContent: this.recompose(answers),
      });
      return true;
    }
    return false;
  }
  reportResult() {
    this.speakNow();
    const {
      parts,
      word,
      answers,
      typoWarning,
      wordShownFirstAt,
      typoContent,
    } = this.state;
    const target = word.to.replace(/\*/gi, "");
    const answer = this.recompose(answers);
    const guessed = !this.answerDistance(answer, target);

    registerResult({
      id: word.id,
      guessed,
      timing: Date.now() - wordShownFirstAt,
      typo: typoWarning ? typoContent : undefined,
      answer,
    }).then(({ prevWord, nextWord }) => {
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
            answers: answers.map((r) => ""),
            placeHolders: parts
              .filter((p) => p.type == "input")
              .map((p) => (
                <ShowDiff answer={answers[p.answerIndex]} to={p.text} />
              )),
          });
        }
      });
    });
  }
  onSubmitAnswer = (e) => {
    e.preventDefault();
    const { mode } = this.state;
    if (mode == "incorrect") {
      return this.validateFailure();
    }
    return this.reportTypo() || this.reportResult();
  };

  trainNextWord = () => {
    this.setNewWord(this.nextWord);
    this.nextWord = null;
  };
  validateFailure = (e) => {
    if (this.answerDistance()) {
      return; // didn't type well
    } else {
      this.trainNextWord();
    }
  };
  setAnswer = (i) => (e) => {
    const answers = [...this.state.answers];
    answers[i] = e.target.value;
    this.setState({ answers });
  };
  sendToEndOfList = (e) => {
    e.preventDefault();
    const { word } = this.state;
    sendToEndOfList(word.id).then((nextWord) => {
      this.nextWord = nextWord;
      this.trainNextWord();
    });
  };
  renderByMode() {
    const {
      word,
      answer,
      mode,
      typoWarning,
      parts,
      answers,
      placeHolders,
    } = this.state;

    return (
      <Ask
        mode={mode}
        placeHolders={placeHolders}
        typoWarning={typoWarning}
        word={word}
        parts={parts}
        answers={answers}
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
        style={{ backgroundColor: catColor(this.state.word.stats) }}
      >
        {this.renderByMode()}
      </div>
    );
  }
}

class Ask extends Component {
  // focusInput = () => {
  //   this.input && this.input.focus();
  // };
  // blurInput = () => {
  //   // Focusing only opens the keyboard if the input
  //   // was previously blurred.
  //   this.input && this.input.blur();
  // };
  // componentDidMount() {
  //   window.addEventListener("focus", this.focusInput);
  //   window.addEventListener("blur", this.blurInput);
  //   this.focusInput();
  // }
  // componentWillUnmount() {
  //   window.removeEventListener("focus", this.focusInput);
  //   window.removeEventListener("blur", this.blurInput);
  // }

  componentWillReceiveProps(nextProps) {
    if (this.props.word.id != nextProps.word.id) {
      // setTimeout(this.focusInput);
    }
  }

  render() {
    let {
      word,
      parts,
      answers,
      setAnswer,
      onSubmitAnswer,
      typoWarning,
      mode,
      placeHolders,
    } = this.props;
    console.log("Ask has props : ", { parts });
    return (
      <form onSubmit={onSubmitAnswer}>
        <h1>
          <Link href={"/editOne/" + word.id}>{word.from}</Link>
        </h1>

        {Question({
          parts,
          answers,
          onKeyUp: setAnswer,
          onRef: (n) => (this.input = n),
          placeHolders,
        })}

        {typoWarning && <label>Please check for a typo</label>}

        <a
          className={"button delay float-bottom"}
          onClick={this.props.sendToEndOfList}
        >
          Learn later
        </a>
        <button className={" float-bottom"} type="submit">
          {mode == "incorrect" ? "Next" : "Check"}
        </button>
      </form>
    );
  }
}

export function Question({ parts, answers, onKeyUp, onRef, placeHolders }) {
  return (
    <div className={style.fillTheBlank}>
      {parts.map((p, i) =>
        p.type == "text" ? (
          <span className={"ru-text"} key={i}>
            {p.text}
          </span>
        ) : (
          <span key={i} input-placeholder-wrapper>
            <input
              type="text"
              className={"ru-text"}
              value={answers[p.answerIndex]}
              onKeyUp={onKeyUp(p.answerIndex)}
            />
            <span
              className={"ru-text"}
              style={{
                opacity:
                  placeHolders[p.answerIndex] && !answers[p.answerIndex]
                    ? 1
                    : 0,
              }}
            >
              {placeHolders[p.answerIndex] || p.text}
            </span>
          </span>
        )
      )}
    </div>
  );
}
//
// class Nope extends Component {
//   componentDidMount() {
//     this.input.focus();
//   }
//   state = { check: [] };
//   isCorrect() {
//     const { word } = this.props;
//     const target = starsSplit(word.to)[1];
//     return sameish(this.state.check, target);
//   }
//   checkCorrectAnswerGiven = (e) => {
//     e.preventDefault();
//     if (this.isCorrect()) {
//       this.props.confirm(e);
//     }
//   };
//   render({ answers,parts, word, confirm }, { check }) {
//
//     return (
//       <form onSubmit={this.checkCorrectAnswerGiven}>
//         <h1>
//           <Link href={"/editOne/" + word.id}>{word.from}</Link>
//         </h1>
//
//         {Question({
//           word,
//           parts,
//           answers: check,
//           onKeyUp: i=>e => {
//             const check=[...this.state.check]
//             check[i]=e.target.value
//             this.setState({ check })
//           },
//           // onRef: (n) => (this.input = n),
//           placeHolder:
//             parts.filter(p=>p.type=='input')
//               .map(p=><ShowDiff answer={answers[p.answerIndex]} to={p.text} />)
//
//         })}
//         <a
//           className={"button delay float-bottom"}
//           onClick={this.props.sendToEndOfList}
//         >
//           Learn later
//         </a>
//         <button className={"primary float-bottom"} disabled={!this.isCorrect()}>
//           Next word
//         </button>
//       </form>
//     );
//   }
// }
