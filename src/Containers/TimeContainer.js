import React, { Component } from 'react';
import './TimeContainer.css';
import Time from '../Components/Time';
import Button from '../Components/Button';
import Session from '../Components/Session';
import Settings from '../Components/Settings';
class TimeContainer extends Component {
  state = {
    isRunning: false,
    timeLeft: 1500, // in seconds
    isBreak: false,
    sessionLength: 25,
    breakLength: 5,
    sessionsGoal: 10,
    sessionsCompleted: 1,
  };

  render() {
    return (
      <div className="wrapper">
        <div className="timer-box">
          <Time time={this.state.timeLeft} status={this.state.isBreak ? 'break' : 'work'} />
          <div className="button-row">
            <Button title="start"/>
            <Button title="reset"/>
          </div>
          <p className="session-title">Sessions Today</p>
          <div className="sessions-row">
          {
            //Create an Array from the sessions goal number, to map over and render X amount of session circles
            Array.from({length: this.state.sessionsGoal}, (v, i) => i).map((session, i) => {
              return <Session completed={(i + 1 <= this.state.sessionsCompleted)}/>
            })
          }
          </div>
        </div>
        <div className="settings-row">
          <Settings title="work" count={this.state.sessionLength}/>
          <Settings title="break" count={this.state.breakLength}/>
          <Settings title="sessions goal" count={this.state.sessionsGoal}/>
        </div>
      </div>
    );
  }
}

export default TimeContainer;
