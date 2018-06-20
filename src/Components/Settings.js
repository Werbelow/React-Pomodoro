import React from 'react';
import PropTypes from 'prop-types';

import './Settings.css';

const Settings = props => {
  return (
    <div className="settings">
      <div className="settings-button-row">
        <button onClick={props.dec}>-</button>
        <p className="settings-time">{props.count}</p>
        <button onClick={props.inc}>+</button>
      </div>
      <div>
        <p className="settings-title">{props.title}</p>
      </div>
    </div>
  );
};

Settings.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  dec: PropTypes.func,
  inc: PropTypes.func
};

Settings.defaultProps = {
  title: 'work',
  count: 25
};

export default Settings;
