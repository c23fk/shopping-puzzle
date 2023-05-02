import { Component } from 'react';
import './App.css';

class App extends Component{
  codes = {
    "beef": "Replace1",
    "cabbage": "Replace2",
  }

  autoCorrect(e){
    
    let input = e.target.value.toLowerCase();
    if (this.codes[input]){
      e.target.value = this.codes[input];
      e.target.style.backgroundColor = "green";
      e.target.style.color = "black"
      e.target.disabled = true;
      delete this.codes[input];
      let x = document.querySelectorAll("input");
      for(let i = 0; i < x.length; i++){
        if(!x[i].disabled){
          x[i].focus();
          break;
        }
      }
    }
  }
  render(){
  return (
    <div className="App">
      <ul>
      <h1>Shopping list</h1>
        <li>Tomatos</li>
        <li>Onions</li>
        <li>Potatos</li>
        <li>Chicken</li>
        <li>Eggs</li>
        <li>
          <input autoFocus onInput = {(e) => this.autoCorrect(e)} className = {"in"}></input>
        </li>
        <li>
          <input onInput = {(e) => this.autoCorrect(e)} className = {"in"}></input>
        </li>
      </ul>
    </div>
  );
  }
}

export default App;
