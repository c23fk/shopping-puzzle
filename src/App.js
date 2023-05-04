import { Component } from 'react';
import './App.css';

const sound = new Audio("nope.mp3");

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      locked: true,
    }
  }
  setLocked(bool){
    this.setState({locked: bool})
  }

  fail(){
    this.setLocked(true);
    
    sound.play();
  }

  render(){
    return (
      <div className="App">
        {this.state.locked? <LockScreen click = {()=>this.setLocked(false)}/>:<ShoppingList fail = {()=>this.fail()}/>}
      </div>
    )
  }
}

class LockScreen extends Component{
  render(){
    return (
      <div>
        <h1>Locked</h1>
        <button onClick={() => this.props.click()}>Unlock</button>
      </div>
    )
  }
}


class ShoppingList extends Component{
  codes = {
    "beef": "Replace1",
    "cabbage": "Replace2",
  }
  autoCorrect(){
    let selectors = document.querySelectorAll("input");
    let seenWords = [];
    let count = 0
    for(let i = 0; i < selectors.length; i++){
      let inp = selectors[i].value.toLowerCase();
      if(this.codes[inp] && !seenWords.includes(inp)){
        seenWords.push(inp);
        count++
        
      }
    }
    if(Object.keys(this.codes).length === count){
      alert("Order Confirmed")
      for(let i = 0; i < selectors.length; i++){
        let inp = selectors[i].value.toLowerCase();
        if(this.codes[inp]){
          selectors[i].value = this.codes[inp];
          selectors[i].style.color = "black"
          selectors[i].disabled = true;
          delete this.codes[inp];
          console.log(selectors[i])
          document.getElementById("submit").disabled = true;
        }
      }
    }else {
      alert("That's not what I wanted!")
      for(let i = 0; i < selectors.length; i++){
        selectors[i].value = "";
      }
      this.props.fail();
    }
    
  }
  render(){
  return (
    <div className="App">
      <ul>
      <h1>Shopping list</h1>
        <li>Tomatoes</li>
        <li>Chicken</li>
        <li>Eggs</li>
        <li>Ice Cream</li>
        <li>Red Herring</li>
        <li>Deconstructed Eggplant Parmigiana</li>
        <li>
          <input autoFocus className = {"in"}></input>
        </li>
        <li>
          <input className = {"in"}></input>
        </li>
        <button id = {"submit"} onClick={() => this.autoCorrect()}>
        Order
      </button>
      </ul>

    </div>
  );
  }
}

export default App;
