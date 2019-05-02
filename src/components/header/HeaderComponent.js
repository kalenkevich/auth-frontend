import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Header,
  Select,
  MobileContext,
  Avatar,
} from '@zenvo/core-ui';
import HeaderComponentStyle from './HeaderComponentStyle';
import SettingsContext from '../../context/SettingsContext';
import AuthorizationContext from '../../context/AuthorizationContext';

const HeaderComponent = (props) => {
  const { classes, history } = props;
  const { AppName } = useContext(SettingsContext);
  const { isMobile } = useContext(MobileContext);
  const { user: authorizedUser, signOut } = useContext(AuthorizationContext);
  const canShowUsersPage =
    authorizedUser &&
    (authorizedUser.roles.includes('ZENVO_MANAGER') || authorizedUser.roles.includes('ZENVO_ADMIN'));
  const currentLocation = history.location.pathname;
  const canShowSignUpPanel = !['/sign-in', '/sign-up'].includes(currentLocation);
  let ResultPanel = null;

  if (authorizedUser) {
    const options = [{
      label: 'My Profile',
      value: 'profile',
    }];

    if (canShowUsersPage) {
      options.push({
        label: 'Users',
        value: 'users',
      });
    }

    options.push({
      label: 'Sign Out',
      value: 'signOut',
    });

    ResultPanel = (
      <div className={classes.actionPanel}>
        <Select
          value={''}
          onSelect={({ value }) => {
            if (value === 'profile') {
              return history.push('/user/me');
            }

            if (value === 'users') {
              return history.push('/users')
            }

            if (value === 'signOut') {
              return signOut();
            }
          }}
          options={options}
          preview={() => (
            <div className={classes.userPanel}>
              <Avatar
                className={classes.userAvatar}
                url={authorizedUser.avatarUrl}
                size='sm'
              />
              { !isMobile ? <div className={classes.userName}>{authorizedUser.name}</div>: null }
            </div>
          )}
        />
      </div>
    );
  } else if (canShowSignUpPanel) {
    ResultPanel = (
      <div className={classes.actionPanel}>
        <Button className={classes.actionPanelButton} onClick={() => history.push('/sign-in')}>
          Sign In
        </Button>
        <Button className={classes.actionPanelButton} onClick={() => history.push('/sign-up')}>
          Sign Up
        </Button>
      </div>
    );
  }

  return (
    <Header appName={AppName}>
      {ResultPanel}
    </Header>
  );
};

HeaderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default withRouter(withStyles(HeaderComponentStyle)(HeaderComponent));
