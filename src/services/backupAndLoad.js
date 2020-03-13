import {addWordToList, getListOfRussianWords, getWordList} from "./trainer";
import {sameish} from "./sameish";
import {showToast} from "../components/notify";

export function downloadBackup(fullBackup) {
  const data={
    wordlist:JSON.parse(localStorage.getItem('wordlist')),
    trainingData:fullBackup?
      JSON.parse(localStorage.getItem('trainingData')):
    [],
  }
  downloadJSON(data)
}

function downloadJSON(object) {
  var dataStr = "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(object));
  var dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href",     dataStr     );
  dlAnchorElem.setAttribute("download", "mywords.json");
  dlAnchorElem.style.position='absolute';
  dlAnchorElem.style.left='-1000px';
  document.body.appendChild(dlAnchorElem)
  dlAnchorElem.click();
  setTimeout(document.body.removeChild(dlAnchorElem), 1000)

}

export function restoreBackup(fileInput, restoreProgress) {

  var reader = new FileReader();
  reader.readAsText(fileInput.files[0]);
  reader.onload=e=>{
    let text=e.target.result
    const {wordlist,trainingData}= JSON.parse(text)
    if(restoreProgress && trainingData.length){
      localStorage.setItem('wordlist',JSON.stringify(wordlist))
      localStorage.setItem('trainingData',JSON.stringify(trainingData))
      window.location.reload()
    }else{
      const reject=getListOfRussianWords()
      let  added=0
      wordlist.forEach(word=>{
        if(!reject.find(w=>sameish(w,word.to))){
          addWordToList(word)
          added++
        }
      })
      showToast(added+' words added to your list')
    }
  }
}

