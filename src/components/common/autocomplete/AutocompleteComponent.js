import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import Input from '../input';

export const AutocompleteStyles = theme => ({
  root: {
    display: 'flex',
    position: 'relative',
  },
  input: {
  },
  options: {
    position: 'absolute',
    top: '32px',
    left: '0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '240px',
    border: theme.border,
    borderRadius: theme.borderRadius,
    backgroundColor: '#FFFFFF',
    overflow: 'scroll',
  },
  option: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
    borderTop: theme.border,
    '': {
      '&:first-of-type': {
        borderTop: 'none',
      },
    },
    '&:hover': {
      backgroundColor: theme.brandPrimaryColor,
    },
  },
});

const Autocomplete = (props) => {
  const {
    className = '',
    classes,
    options,
    value,
    onChange,
    onEnter,
    onSelect,
  } = props;

  return (
    <div className={`${classes.root} ${className}`}>
      <Input
        className={classes.input}
        value={value}
        onChange={e => onChange(e.target.value)}
        onEnter={() => onEnter(value)}
      />
      { options.length ? <div className={classes.options}>
        {(options || []).map(option => (
          <div
            onClick={() => onSelect(option)}
            className={classes.option}
            key={option.value}
          >
            {option.label}
          </div>
        ))}
      </div> : null }
    </div>
  );
};

Autocomplete.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onEnter: PropTypes.func,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
};

export default withStyles(AutocompleteStyles)(Autocomplete);
