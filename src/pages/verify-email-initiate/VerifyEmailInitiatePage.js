import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { withRouter } from 'react-router-dom';
import { Button } from '@zenvo/core-ui';
import AuthorizationContext from '../../context/AuthorizationContext';
import UserService from '../../services/UserService';

const VerifyEmailInitiatePageStyles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: '40px',
    textAlign: 'center',
    fontSize: '24px',
  },
  actionPanel: {
    marginTop: '40px',
  },
  resendEmailButton: {
    width: '200px',
    height: '70px',
    fontSize: '26px',
  },
};

const VerifyEmailInitiatePage = (props) => {
  const { classes } = props;
  const { user } = useContext(AuthorizationContext);
  const resendEmail = async () => {
    await UserService.resendVerificationEmail();
  };

  return (
    <div className={classes.page}>
      <div className={classes.title}>
        Dear <b>{user.name}</b>,
        <br/>
        We send to <b>{user.email}</b> verification email, please open it and follow the link to confirm your email!
      </div>
      <div className={classes.actionPanel}>
        <Button
          className={classes.resendEmailButton}
          onClick={resendEmail}
        >
          Resent Email
        </Button>
      </div>
    </div>
  );
};

VerifyEmailInitiatePage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default withRouter(withStyles(VerifyEmailInitiatePageStyles)(VerifyEmailInitiatePage));
