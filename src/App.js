import React, { Component } from 'react';
import Navbar from './Navbar.js';
import GameStage from './GameStage';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    
    
  this.state = {
      isNewGame: true
    }  
    
    this.onLoad = this.onLoad.bind(this);

  }
  onLoad() {
    this.setState({isNewGame: false})
  }
    
  render() {
 
    return (
      <div className="App">
        <Navbar onNewGame={() => {this.setState({isNewGame: true})} } />
        {this.state.isNewGame  ?      
            <GameStage /> :
            null}
        {this.onLoad}
      </div>
    );
  }
}

export default App;
