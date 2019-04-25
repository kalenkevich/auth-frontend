import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { withRouter } from 'react-router-dom';
import { Button, Header } from '@zenvo/core-ui';
import HeaderComponentStyle from './HeaderComponentStyle';
import SettingsContext from '../../context/SettingsContext';
import AuthorizationContext from '../../context/AuthorizationContext';

const HeaderComponent = (props) => {
  const { classes, history } = props;
  const { AppName } = useContext(SettingsContext);
  const { user: authorizedUser, signOut } = useContext(AuthorizationContext);
  const canShowUsersPage =
    authorizedUser &&
    (authorizedUser.roles.includes('ZENVO_MANAGER') || authorizedUser.roles.includes('ZENVO_ADMIN'));
  const currentLocation = history.location.pathname;
  const canShowSignUpPanel = !['/sign-in', '/sign-up'].includes(currentLocation);
  let ResultPanel = null;

  if (authorizedUser) {
    ResultPanel = (
      <div className={classes.actionPanel}>
        <Button className={classes.actionPanelButton}
          onClick={() => history.push('/user/me')}
          type='secondary'
        >
          Hello, {authorizedUser.name}
        </Button>
        { canShowUsersPage ? (
          <Button className={classes.actionPanelButton}
            type='secondary'
            onClick={() => history.push('/users')}
          >
            Users
          </Button>
        ) : null }
        <Button className={classes.actionPanelButton}
          onClick={signOut}
          type='secondary'
        >
          Sign Out
        </Button>
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
