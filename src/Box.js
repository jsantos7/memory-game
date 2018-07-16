import React, { Component } from 'react';

class Box extends Component{
    
    defaultProps = {
        onHandleClick(){},
        onPassCardState(){}
    }
    
    render(){
        // temporary fix
        // need to get the info from GameStage
        const CardState = {
          HIDING: 0,
          SHOWING: 1,
          MATCHING: 2
        };
        
        // const CardState = this.props.onPassCardState;
        var {id, cardState, backgroundColor} = this.props.card;
        var color = '';
        if(cardState === CardState.HIDING){
             color = 'grey';
        }  else if(cardState === CardState.SHOWING) {
          color = backgroundColor;
        } else if(cardState === CardState.MATCHING) {
          color = null;
        }
        var myStyle = {
            width: '130px',
            height:'130px',
            backgroundColor: '',
            borderRadius: '25px',
            margin: '15px'
        }
        
        myStyle.backgroundColor = color;
        
        return (
                <div id={id} className="box" style={myStyle} onClick={this.props.onHandleClick}>
                </div>
            );
    }
}

export default Box;