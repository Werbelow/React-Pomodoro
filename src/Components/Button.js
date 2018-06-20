import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = props => {
  return <button className="button" onClick={props.handleClick}>{props.title.toUpperCase()}</button>;
};

Button.propTypes = {
  title: PropTypes.string
};

Button.defaultProps = {
  title: 'START'
};

export default Button;
