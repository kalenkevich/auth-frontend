import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@zenvo/core-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withStyles from 'react-jss';
import providers from '../../constants/providers';

const SocialPanelStyles = {
  root: {
    display: 'flex',
  },
  socialButton: {
    width: '45px',
    marginLeft: '10px',
    minWidth: 'initial',
    '&:first-of-type': {
      marginLeft: '0',
    },
  },
  icon: {
    width: '25px !important',
    height: '25px !important',
  },
};

const SocialPanel = (props) => {
  const { classes, className, onClick } = props;

  return (
    <div className={`${classes.root} ${className}`}>
      {providers.map(provider => (
        <Button key={provider}
          type='secondary'
          className={classes.socialButton}
          onClick={() => onClick(provider)}
        >
          <FontAwesomeIcon
            className={classes.icon}
            icon={['fab', provider]}
          />
        </Button>
      ))}
    </div>
  );
};

SocialPanel.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  history: PropTypes.string,
  onClick: PropTypes.func,
};

export default withStyles(SocialPanelStyles)(SocialPanel);
