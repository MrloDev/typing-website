import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Words from "./words.json";
import reportWebVitals from "./reportWebVitals";

function App() {
  let wordAmount = 0;
  let finalCount = 0;
  let displayWords = [];
  function countChange(event) {
    wordAmount = event.target.value;
  }
  function updateCount(event) {
    event.preventDefault();
    finalCount = wordAmount;
    generate(finalCount);
  }
  let wordIndex = 0; 
  let beginTime; 
  let endTime; 
  function checkWord(event) { 
    /*
    if (wordIndex === 0)
      beginTime=performance.now; 
    if (wordIndex === displayWords.length - 1)
      endTime=performance.now; 
    */
    document.getElementById(displayWords[wordIndex]).innerHTML = `<span id="currentWord">` + displayWords[wordIndex] +"<span/>"; 
    if (`${displayWords[wordIndex]} ` === event.target.value) {
      wordIndex++; 
      document.getElementById('wordInput').value=''; 
    }
    console.log(displayWords[wordIndex]); 
    console.log(wordIndex); 
  }
  function generate(wordCount) {
    displayWords = []
    document.getElementById('wordHolder').innerHTML = null;
    let last = "";
    for (let i = 0; i < wordCount; i++) {
      let currentWord = Words[Math.floor(Math.random() * 1000)];
      while (currentWord === last) {
        currentWord = Words[Math.floor(Math.random() * 1000)];
      }
      let current=currentWord;
      if (i !== wordCount - 1) {
        currentWord+=" ";
      }
      displayWords.push(current); 
      document.getElementById('wordHolder').innerHTML +=
       `<span id="` + currentWord + `"/>` + currentWord + `</span>`; 
      last = current;
    } 
    const time = endTime - beginTime; 
    document.getElementById('timeDisplay').innerHTML = time; 
  }
  
  return (
    <div className="content">
      <div id="timeDisplay">
      </div>
      <div className="options">
        <form className="optionsForm" onSubmit={updateCount}>
          <div className="input-group mb-3">
            <input
              onChange={countChange}
              className="form-control"
              type="text"
              placeholder="Word Amount"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="wordHolder" id="wordHolder">
          Enter a number of words above. 
      </div>
      <div className="wordInputDiv">
        <br /> 
        <input 
          className="form-control"
          onChange={checkWord}
          id="wordInput"
          type="text" 
          placeholder="Word Input"
        />
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();