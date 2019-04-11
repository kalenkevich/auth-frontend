import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { Link, withRouter } from 'react-router-dom';
import Button from '../common/button';
import SettingsContext from '../../context/SettingsContext';
import HeaderComponentStyle from './HeaderComponentStyle';
import AuthorizationContext from '../../context/AuthorizationContext';

const HeaderComponent = (props) => {
  const { classes, history } = props;
  const { AppName } = useContext(SettingsContext);
  const { user: authorizedUser, signOut } = useContext(AuthorizationContext);
  const canShowUsersPage =
    authorizedUser &&
    (authorizedUser.roles.includes('ZENVO_MANAGER') || authorizedUser.roles.includes('ZENVO_ADMIN'));

  let ResultPanel = null;
  if (authorizedUser) {
    ResultPanel = (
      <div className={classes.actionPanel}>
        <Button className={classes.actionPanelButton}>
          Hello, ${authorizedUser.name}
        </Button>
        { canShowUsersPage ? (
          <Button className={classes.actionPanelButton}
                  onClick={() => history.push('/users')}
          >
            Users
          </Button>
        ) : null }
        <Button className={classes.actionPanelButton} onClick={signOut}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className={classes.headerContainer}>
      <Link className={classes.brandTitle} to='/'>{AppName}</Link>
      {ResultPanel}
    </div>
  );
};

HeaderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default withRouter(withStyles(HeaderComponentStyle)(HeaderComponent));
