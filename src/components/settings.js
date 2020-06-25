import { h, Component, Fragment } from "preact";
import { getSetting, setSetting } from "../services/settings";

import { Link } from "preact-router/match";
import { downloadBackup, restoreBackup } from "../services/backupAndLoad";
import style from "./settings.less";
import { DisplayChangeLog } from "./DisplayChangeLog";
export class Settings extends Component {
  state = getSetting();
  change(key, value) {
    this.setState({ [key]: value });
    setSetting(key, value);
  }
  render(props, state, context) {
    const {
      whenEmptyList,
      useSounds,
      fullBackup,
      restoreProgress,
      ignoreAccents,
      warnTypo,
      useCursiveFont,
    } = this.state;
    return (
      <div settings className={style.this}>
        <form>
          <h2>Ignore all accents when checking answer</h2>
          <p>
            The usage of the double dots is inconsistent and some vocabulary you
            input might have accentuation marks, so you might want to ignore the
            accents alltogether.
          </p>
          <label>
            <input
              type={"radio"}
              name={"ignoreAccents"}
              checked={ignoreAccents === true}
              onChange={(e) => this.change("ignoreAccents", true)}
            />
            Ignore accents
          </label>
          <label>
            <input
              type={"radio"}
              name={"ignoreAccents"}
              checked={ignoreAccents === false}
              onChange={(e) => this.change("ignoreAccents", false)}
            />
            Treat accented characters as different characters
          </label>

          <h2>Use cursive font</h2>
          <p>Trains you to read the cursive font in russian</p>
          <label>
            <input
              type={"radio"}
              name={"useCursiveFont"}
              checked={useCursiveFont === true}
              onChange={(e) => this.change("useCursiveFont", true)}
            />
            Cursive font
          </label>
          <label>
            <input
              type={"radio"}
              name={"useCursiveFont"}
              checked={useCursiveFont === false}
              onChange={(e) => this.change("useCursiveFont", false)}
            />
            Normal font
          </label>

          <h2>Warn on typos</h2>
          <p>
            If you typed one letter wrong, instead of counting as a mistake, the
            app will tell you to double check.
          </p>
          <label>
            <input
              type={"radio"}
              name={"warnTypo"}
              checked={warnTypo === true}
              onChange={(e) => this.change("warnTypo", true)}
            />
            Show me the warning
          </label>
          <label>
            <input
              type={"radio"}
              name={"warnTypo"}
              checked={warnTypo === false}
              onChange={(e) => this.change("warnTypo", false)}
            />
            Just treat it as a mistake
          </label>

          <h2>Audio</h2>
          <p>
            We use the text to speech engine of your device to playback words
            while you're learning them, but this might cut off your music if you
            like to train with music. For this reason, you might want to turn
            that feature off.
          </p>
          <label>
            <input
              type={"radio"}
              name={"useSounds"}
              checked={useSounds}
              onChange={(e) => this.change("useSounds", true)}
            />
            On
          </label>
          <label>
            <input
              type={"radio"}
              name={"useSounds"}
              checked={!useSounds}
              onChange={(e) => this.change("useSounds", false)}
            />
            Off
          </label>

          <h2>Backup</h2>
          <p>
            You want to change on which device you are training ? Then select
            "words and progress" below, generate your backup file, and load it
            on another device. If you just want to share your vocabulary list
            with a friend, select "just words" and they'll be able to import it
            to complete their existing list.
          </p>
          <label>
            <input
              type={"radio"}
              name={"fullBackup"}
              checked={!fullBackup}
              onChange={(e) => this.change("fullBackup", false)}
            />
            just words
          </label>
          <label>
            <input
              type={"radio"}
              name={"fullBackup"}
              checked={fullBackup}
              onChange={(e) => this.change("fullBackup", true)}
            />
            words and progress
          </label>
          <button
            className={"primary"}
            onClick={(e) => {
              e.preventDefault();
              downloadBackup(getSetting().fullBackup);
            }}
          >
            Download
          </button>

          <h2>Restore</h2>
          <p>
            If you restore a file that was exported with "only words" selected,
            then we'll just add the words to the list. If the file is a full
            backup, then you can choose to replace your current word list and
            progress with the ones from this file. You can also just extract the
            words from the backup. If a word is already present in your list, we
            won't touch it.
          </p>

          <label>
            <input
              type={"radio"}
              name={"restoreProgress"}
              checked={!restoreProgress}
              onChange={(e) => this.change("restoreProgress", false)}
            />
            Only add missing words
          </label>
          <label>
            <input
              type={"radio"}
              name={"restoreProgress"}
              checked={restoreProgress}
              onChange={(e) => this.change("restoreProgress", true)}
            />
            Replace current state with backup
          </label>
          <input
            type={"file"}
            onChange={(e) => {
              restoreBackup(e.target, getSetting().restoreProgress);
            }}
          />

          <h2>Reset app</h2>
          <p>
            This is the equivalent of uninstalling the app and reinstalling it.
            It will trigger a download of a full backup, so that you can recover
            your progress and word list if you made a mistake.
          </p>

          <button
            className={"primary"}
            onClick={(e) => {
              e.preventDefault();
              if (
                window.confirm(
                  "This will reset all your words and progress, are you sure ?"
                )
              ) {
                downloadBackup(true);
                localStorage.clear();
                window.location.reload();
              }
            }}
          >
            Hard reset ...
          </button>
        </form>
        <h2>Current version of the app</h2>
        <p>
          You are running the app version :{" "}
          {process.env.COMMIT_REF || "Unknown"}
        </p>
        <DisplayChangeLog />
      </div>
    );
  }
}
