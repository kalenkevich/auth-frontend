import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import withStyle from 'react-jss';
import MobileContext from '../../../context/MobileContext';

export const style = theme => ({
  root: {
    minHeight: '32px',
    border: `1px solid ${theme.brandPrimaryColor}`,
    borderRadius: theme.borderRadius,
    cursor: 'pointer',
    transition: 'background-color linear 100ms',
    outline: 'none',
    minWidth: '80px',
    fontSize: '14px',
    '&.mobile': {
      minWidth: 'initial',
    },
    '&.primary': {
      backgroundColor: 'transparent',
    },
    '&.primary:hover': {
      backgroundColor: theme.brandPrimaryColor,
    },
    '&.secondary': {
      backgroundColor: 'transparent',
    },
    '&.secondary:hover': {
      backgroundColor: 'transparent',
    },
    '&.danger': {
      backgroundColor: '#ef5350',
    },
    '&.danger:hover': {
      backgroundColor: '#d32f2f',
    },
    '&.success': {
      backgroundColor: '#8bc34a',
    },
    '&.success:hover': {
      backgroundColor: '#689f38',
    },
    '&:disabled': {
      cursor: 'default',
      backgroundColor: theme.brandPrimaryColor,
    },
    '&:disabled:hover': {
      cursor: 'default',
      backgroundColor: theme.brandPrimaryColor,
    },
  },
});

const ButtonComponent = (props) => {
  const {
    classes,
    type = 'primary',
    children,
    onClick,
    className = '',
    disabled = false,
  } = props;
  const { isMobile } = useContext(MobileContext);

  return (
    <button
      className={`${classes.root} ${className} ${type} ${isMobile ? 'mobile' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

ButtonComponent.propTypes = {
  classes: PropTypes.object,
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

export default withStyle(style)(ButtonComponent);
