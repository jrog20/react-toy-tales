import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  // Fetch and render the toys
  componentDidMount() {
    fetch('http://localhost:3000/toys')
      .then(res => res.json())
      .then(toyData => {
        this.setState({
          toys: toyData
        })
      })
  }

  // Create a new toy
  createToy = (newToy) => {
    this.setState({
      toys: [...this.state.toys, newToy]
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm createToy={this.createToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys}/>
      </>
    );
  }

}

export default App;
