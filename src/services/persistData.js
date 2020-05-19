import { downloadBackup } from "./backupAndLoad";
import { showToast } from "../components/notify";
import { getLS, updateLS } from "./LS";

updateLS("installDate", (date) => date || Date.now());

export function madeABackup() {
  updateLS("lastBackup", () => Date.now());
  updateLS("wordsAddedSinceLastSave", (count) => 0);
}

export function addedWords(added = 1) {
  updateLS("wordsAddedSinceLastSave", (count) => (count || 0) + added);
}
if (navigator.storage)
  navigator.storage.persist().then(function (persisted) {
    if (persisted) {
      if (!getLS("grantedAlready")) {
        showToast("Your data should be safe");
      }
      updateLS("grantedAlready", () => true);

      return;
    }
    if (getLS("wordsAddedSinceLastSave")) {
      showToast("Backup of your list downloading");
      downloadBackup(true);
    }
  });
