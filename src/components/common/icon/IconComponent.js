import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { USER_ICON } from './IconType';
import userPlaceholder from '../../../assets/images/user-placeholder.jpg';

export const getIconByType = (type, className, classes, width, height) => {
  switch (type) {
    case USER_ICON:
      return <img
        style={{ width, height }}
        className={`${className} ${classes.root}`}
        src={userPlaceholder}
      />;
    default:
      return null;
  }
};

export const styles = {
  root: {
    objectFit: 'contain',
  },
};

const Icon = ({
  src,
  type,
  className = '',
  classes,
  width = 50,
  height = 50,
}) => {
  const [imageLoadFail, setImageLoadFail] = useState(false);

  if (!src || imageLoadFail) {
    return getIconByType(type, className, classes, width, height);
  }

  return <img
    src={src}
    style={{ width, height }}
    className={`${className} ${classes.root}`}
    onError={() => setImageLoadFail(true)}
  />;
};

Icon.propTypes = {
  src: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default withStyles(styles)(Icon);
