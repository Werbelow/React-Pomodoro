import React, { Component } from 'react';
import './App.css';
import TimeContainer from './Containers/TimeContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>React Pomodoro</h2>
        <TimeContainer />
      </div>
    );
  }
}

export default App;
