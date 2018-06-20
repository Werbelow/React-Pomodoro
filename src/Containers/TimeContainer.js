import React, { Component } from 'react';
import './TimeContainer.css';
import Time from '../Components/Time';
import Button from '../Components/Button';
import Session from '../Components/Session';
import Settings from '../Components/Settings';
class TimeContainer extends Component {
  state = {
    isRunning: false,
    isPaused: false,
    timeLeft: 1500, // in seconds
    isBreak: false,
    sessionLength: 1500, // in seconds
    breakLength: 300, // in seconds
    sessionsGoal: 10,
    sessionsCompleted: 0
  };

  componentWillUnmount = () => {
    clearInterval(this.interval)
  }

  incSession = () => {
    this.setState((prevState, props) => {
      return {
        sessionLength: prevState.sessionLength + 60,
        timeLeft: prevState.timeLeft + 60
      };
    });
  };

  decSession = () => {
    this.setState((prevState, props) => {
      return {
        sessionLength: prevState.sessionLength - 60,
        timeLeft: prevState.timeLeft - 60
      };
    });
  };

  incBreak = () => {
    this.setState((prevState, props) => {
      return { breakLength: prevState.breakLength + 60 };
    });
  };

  decBreak = () => {
    this.setState((prevState, props) => {
      return { breakLength: prevState.breakLength - 60 };
    });
  };

  incGoal = () => {
    this.setState((prevState, props) => {
      return { sessionsGoal: prevState.sessionsGoal + 1 };
    });
  };

  decGoal = () => {
    this.setState((prevState, props) => {
      return { sessionsGoal: prevState.sessionsGoal - 1 };
    });
  };

  startTimer = () => {
    // 1. Update state
    this.setState({
      isRunning: true,
      isPaused: false
    });
    // 2. Clear interval to prevent duplicated intervals
    clearInterval(this.interval);
    // 3. Create new 1 second interval
    this.interval = setInterval(() => {
      // 4. Update timeLeft in state
      this.setState(
        (prevState, props) => {
          return { timeLeft: prevState.timeLeft - 1 };
        },
        () => {
          // 5. If no time left
          if (this.state.timeLeft < 1) {
            //5a. If on a break, start a new work session
            if (this.state.isBreak) {
              this.setState((prevState, props) => {
                return { isBreak: false, timeLeft: prevState.sessionLength };
              });
              this.startTimer();
            } else {
              // 5b. If on a work session, increase the completed sessions, and start a break session.
              this.setState((prevState, props) => {
                return {
                  isBreak: true,
                  timeLeft: prevState.breakLength,
                  sessionsCompleted: prevState.sessionsCompleted + 1
                };
              });
            }
          }
        }
      );
    }, 1000);
  };

  pauseTimer = () => {
    clearInterval(this.interval);
    this.setState({
      isRunning: false,
      isPaused: true
    });
  };

  resetTimer = () => {
    clearInterval(this.interval);
    this.setState((prevState, props) => {
      return {
        isRunning: false,
        isPaused: false,
        isBreak: false,
        timeLeft: prevState.sessionLength
      };
    });
  };

  render() {
    let time =
      this.state.isRunning || this.state.isPaused
        ? this.state.timeLeft
        : this.state.sessionLength;

    return (
      <div className="wrapper">
        <div className="timer-box">
          <Time time={time} status={this.state.isBreak ? 'break' : 'work'} />
          <div className="button-row">
            <Button
              title={this.state.isRunning ? 'pause' : 'start'}
              handleClick={
                this.state.isRunning ? this.pauseTimer : this.startTimer
              }
            />
            <Button title="reset" handleClick={this.resetTimer} />
          </div>
          <p className="session-title">Sessions Today</p>
          <div className="sessions-row">
            {//Create an Array from the sessions goal number, to map over and render X amount of session circles
            Array.from({ length: this.state.sessionsGoal }, (v, i) => i).map(
              (session, i) => {
                return (
                  <Session
                    completed={i + 1 <= this.state.sessionsCompleted}
                    key={i}
                  /> //note: using index as a key is not the best, but for this demo, we don't have a unique ID, nor is the order changing
                );
              }
            )}
          </div>
        </div>
        <div className="settings-row">
          <Settings
            title="work"
            count={this.state.sessionLength / 60}
            inc={this.incSession}
            dec={this.decSession}
          />
          <Settings
            title="break"
            count={this.state.breakLength / 60}
            inc={this.incBreak}
            dec={this.decBreak}
          />
          <Settings
            title="sessions goal"
            count={this.state.sessionsGoal}
            inc={this.incGoal}
            dec={this.decGoal}
          />
        </div>
      </div>
    );
  }
}

export default TimeContainer;
