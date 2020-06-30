import { h, Component, Fragment } from "preact";
import { getSetting, setSetting } from "../services/settings";

import style from "./settings.less";
import { DisplayChangeLog } from "./DisplayChangeLog";
import { needsBackup } from "../services/persistData";
import { downloadBackup, restoreBackup } from "../db/backupRestore";
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
            You want to change on which device you are training ? Then generate
            your backup file here, and load it on another device.
          </p>

          <button
            className={"primary"}
            onClick={(e) => {
              e.preventDefault();
              downloadBackup();
            }}
          >
            Download
          </button>

          <h2>Restore</h2>
          <p>
            Replace the current application state with a file exported earlier
            from the same app
          </p>

          <input
            type={"file"}
            accept=".mywordsbackup"
            onChange={(e) => {
              restoreBackup(e.target);
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
                if (needsBackup()) {
                  downloadBackup();
                }
                localStorage.clear();
                window.location.reload();
              }
            }}
          >
            Hard reset ...
          </button>
        </form>
        <h2>Current version of the app</h2>
        <p>You are running the app version : {process.env.COMMIT_REF}</p>
        <DisplayChangeLog />
      </div>
    );
  }
}
