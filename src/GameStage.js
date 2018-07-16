import React, {Component} from 'react';
import update from 'immutability-helper';
import Box from './Box.js';
// import PropTypes from 'prop-types';
import './GameStage.css';


const CardState = {
       HIDING: 0,
       SHOWING: 1,
       MATCHING: 2
    };
    
class GameStage extends Component{
    
    constructor(props){
        super(props);
       
    var cards = [
        {id: 0, cardstate: CardState.HIDING, backgroundColor: 'blue'},
        {id: 1, cardstate: CardState.HIDING, backgroundColor: 'blue'},
        {id: 2, cardState: CardState.HIDING, backgroundColor: 'red'},
        {id: 3, cardState: CardState.HIDING, backgroundColor: 'red'},
        {id: 4, cardState: CardState.HIDING, backgroundColor: 'orange'},
        {id: 5, cardState: CardState.HIDING, backgroundColor: 'orange'},
        {id: 6, cardState: CardState.HIDING, backgroundColor: 'black'},
        {id: 7, cardState: CardState.HIDING, backgroundColor: 'black'},
        {id: 8, cardState: CardState.HIDING, backgroundColor: 'green'},
        {id: 9, cardState: CardState.HIDING, backgroundColor: 'green'},
        {id: 10, cardState: CardState.HIDING, backgroundColor: 'violet'},
        {id: 11, cardState: CardState.HIDING, backgroundColor: 'violet'},
        {id: 12, cardState: CardState.HIDING, backgroundColor: 'purple'},
        {id: 13, cardState: CardState.HIDING, backgroundColor: 'purple'},
        {id: 14, cardState: CardState.HIDING, backgroundColor: 'yellow'},
        {id: 15, cardState: CardState.HIDING, backgroundColor: 'yellow'}
    ];
        
        
        // app working almost fine without shuffle
        this.state = {
            cards: cards,
            cardsClicked: [],
            numClicks: 0
        }
        
        this.handleClick = this.handleClick.bind(this);
        this.passCardState = this.passCardState.bind(this);
    }
    
    static defaultProps = {
        onLoad(){}
    }
    
    componentDidMount() {
      window.addEventListener('load', this.props.onLoad);
    }
    
    
    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    
    handleClick(e){
        
        var numId = parseInt(e.target.id, 10);
        
        console.log('Im in handleClick function');
        console.log('cards clicked before setstate');
        console.log(this.state.numClicks);
        
        this.setState((prevState, props) => {
            var num = this.state.numClicks;
            return ({
            cards : update(this.state.cards, {[numId]: {cardState: {$set: CardState.SHOWING}}}),
            numClicks: update(this.state.numClicks, {$set: num + 1}),
            cardsClicked: update(this.state.cardsClicked, {$push: [numId]})
            })
        });
        
        console.log('cards clicked after setstate');
        console.log(this.state.numClicks);
        console.log(this.state.cardsClicked);
        

        if(this.state.numClicks === 2)
          this.checkIfMatch();
        
    }
    
    checkIfMatch(){
        console.log('Im inside checkifMatch');
        var pairArr = [[0,1],[1,0],
                       [2,3],[3,2],
                       [4,5],[5,4],
                       [6,7],[7,6],
                       [8,9],[9,8],
                       [10,11],[11,10],
                       [12,13],[13,12],
                       [14,15],[15,14]];
                       
        var pairs = new Map(pairArr);
        
        
        var firstCardClicked = this.state.cardsClicked[0];
        var secondCardClicked = this.state.cardsClicked[1];
        
        console.log('2 items were clicked. set the count to 0 and empty the array');
        this.setState((prevState, props) => {
            var newArr = [];
            return {
              cards: this.state.cards,
              numClicks: update(this.state.numClicks, {$set: 0}),
              cardsClicked: newArr
            }
        });
        
        console.log('new value of clicksCount and cards clicked array');
        console.log(this.state.numClicks);
        console.log(this.state.cardsClicked);
        
        
        if(pairs.get(firstCardClicked) === secondCardClicked){
            console.log('if first and second clicked items are equal');
            
            
            const cards = this.state.cards.map(card => {
                if (card.id === firstCardClicked){
                  return {
                      id: firstCardClicked,
                      cardState: CardState.MATCHING,
                      backgroundColor: ''
                  }
                } else if(card.id === secondCardClicked){
                  return {
                      id: secondCardClicked,
                      cardState: CardState.MATCHING,
                      backgroundColor: ''
                  }
                } else {
                  return card;
                }
            });
            this.setState({cards});
        } else if(pairs.get(firstCardClicked) !== secondCardClicked){
            console.log('if first and second clicked items are not equal');
            
            const cards = this.state.cards.map(card => {
                var color = '';
                if (card.id === firstCardClicked){
                    color = card.backgroundColor;
                  return {
                      id: firstCardClicked,
                      cardState: CardState.HIDING,
                      backgroundColor: color
                  }
                } else if(card.id === secondCardClicked){
                    color = card.backgroundColor;
                  return {
                      id: secondCardClicked,
                      cardState: CardState.HIDING,
                      backgroundColor: color
                  }
                } else {
                  return card;
                }
            });
            this.setState({cards});
        }
        
    }
    
    passCardState(){
        return CardState;
    }
   
    render(){
         const newCards = this.state.cards.map((card, index) => (
          <Box key={index} card={card} onHandleClick={this.handleClick} onPassCardState={this.passCardState} />
        ));
        
        return (
            
              <div className='box-container'>
                {newCards}
                
              </div>
        );
    }
}

export default GameStage;