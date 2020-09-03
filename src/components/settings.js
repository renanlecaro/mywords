import { h, Component, Fragment } from "preact";

import style from "./settings.less";
import { DisplayChangeLog } from "./DisplayChangeLog";
import { needsBackup } from "../services/persistData";
import { downloadBackup, restoreBackup } from "../db/backupRestore";
export function Settings() {
  return (
    <div settings className={style.this}>
      <form>
        <button
          className={"primary"}
          onClick={(e) => {
            e.preventDefault();
            downloadBackup();
          }}
        >
          Download backup
        </button>

        <p>Generates a file you can load somewhere else</p>

        <label className={"button"}>
          Restore backup
          <input
            type={"file"}
            accept=".mywordsbackup"
            onChange={(e) => {
              restoreBackup(e.target);
            }}
          />
        </label>

        <p>
          Replace the current application state with a file exported earlier.
        </p>
      </form>
      <DisplayChangeLog />

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
        Reset app
      </button>
      <p>
        Puts the app in the state where you first opened it, without content.
      </p>
    </div>
  );
}
