import React, {Component} from 'react';
import './Navbar.css';

class Navbar extends Component{
    static defaultProps = {
        onNewGame(){}
    }
    
    render(){
        return (
            <div className="container">
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand">Navbar</a>
                <a className="text" onClick={this.props.onNewGame}> New Game </a>
              </nav>
            </div>
            )
    }
}

export default Navbar;