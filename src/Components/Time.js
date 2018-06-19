import React from 'react';
import PropTypes from 'prop-types';

import './Time.css';

const renderTime = time => {
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  let newTime =
    minutes.toString() + ':' + (seconds < 10 ? '0' + seconds : seconds);
  return newTime;
};

const Time = props => {
  return (
    <div>
      <h1 className="clock">{renderTime(props.time)}</h1>
      <p className="status">{props.status}</p>
    </div>
  );
};

Time.propTypes = {
  time: PropTypes.number,
  status: PropTypes.string
};

Time.defaultProps = {
  time: 1500, // in seconds
  status: 'work'
};

export default Time;
