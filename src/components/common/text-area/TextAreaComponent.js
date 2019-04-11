import React from 'react';
import PropTypes from 'prop-types';
import withStyle from 'react-jss';
import TextAreaComponentStyle from './TextAreaComponentStyle';

const TextAreaComponent = (props) => {
  const {
    classes,
    value,
    onChange,
    className = '',
    placeholder = '',
    onBlur = () => {},
    autoFocus = false,
  } = props;

  return (
    <textarea
      placeholder={placeholder}
      className={`${classes.root} ${className}`}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoFocus={autoFocus}
    />
  );
};

TextAreaComponent.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default withStyle(TextAreaComponentStyle)(TextAreaComponent);
