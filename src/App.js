import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import Pokemon from "./Pokemon.json";

function shufflePokemon(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  class App extends Component {
    // Set this.state
    state = {
      Pokemon,
      currentScore: 0,
      topScore: 0,
      shout: "",
      clicked: [],
    };
  
    handleClick = id => {
      if (this.state.clicked.indexOf(id) === -1) {
        this.handleIncrement();
        this.setState({ clicked: this.state.clicked.concat(id) });
      } else {
        this.handleReset();
      }
    };
  
    handleIncrement = () => {
      const newScore = this.state.currentScore + 1;
      this.setState({
        currentScore: newScore,
        shout: ""
      });
      if (newScore >= this.state.topScore) {
        this.setState({ topScore: newScore });
      }
      else if (newScore === 12) {
        this.setState({ shout: "You win!" });
      }
      this.handleShuffle();
    };
  
    handleReset = () => {
      this.setState({
        currentScore: 0,
        topScore: this.state.topScore,
        shout: "NOOO Pikachu!! Try again!",
        clicked: []
      });
      this.handleShuffle();
    };
  
    handleShuffle = () => {
      let shuffledPokemon = shufflePokemon(Pokemon);
      this.setState({ Pokemon: shuffledPokemon });
    };
  
    render() {
      return (
        <Wrapper>
          <Nav
            title="Pokemon Clicky"
            score={this.state.currentScore}
            topScore={this.state.topScore}
            shout={this.state.shout}
          />
  
          <Title>
            Try to click on each Pokemon only once!
          </Title>
  
          <Container>
            <Row>
              {this.state.Pokemon.map(Pokemon => (
                <Column size="md-3 sm-6">
                  <FriendCard
                    key={Pokemon.id}
                    handleClick={this.handleClick}
                    handleIncrement={this.handleIncrement}
                    handleReset={this.handleReset}
                    handleShuffle={this.handleShuffle}
                    id={Pokemon.id}
                    image={Pokemon.image}
                  />
                </Column>
              ))}
            </Row>
          </Container>
        </Wrapper>
      );
    }
  }
  
  export default App;