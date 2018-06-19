import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Session.css';

const Session = props => {
  let sessionClass = classnames('session', { completed: props.completed });

  return <div className={sessionClass} />;
};

Session.propTypes = {
  completed: PropTypes.bool
};

export default Session;
