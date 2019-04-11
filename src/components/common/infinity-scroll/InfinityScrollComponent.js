import React from 'react';
import PropTypes from 'prop-types';

const InfinityScrollComponent = (props) => {
  const {
    classes = { root: '' },
    children,
    className,
  } = props;

  return (
    <div className={`${classes.root} ${className}`}>
      {children}
    </div>
  );
};

InfinityScrollComponent.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  onScrolledToEnd: PropTypes.func,
};

export default InfinityScrollComponent;
