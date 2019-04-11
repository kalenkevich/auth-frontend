import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import LabelComponentStyles from './LabelComponentStyle';

const LabelComponent = ({
  classes,
  className,
  value,
  type,
}) => (
  <div className={`${classes.root} ${type} ${className}`}>{value}</div>
);

LabelComponent.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
};

export default withStyles(LabelComponentStyles)(LabelComponent);
