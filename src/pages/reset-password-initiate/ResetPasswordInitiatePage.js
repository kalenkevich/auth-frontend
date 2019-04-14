import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { withRouter } from 'react-router-dom';
import { Button, Input, Label } from '@zenvo/core-ui';
import { getForInput } from '../sign-in/SignInPage';
import AuthorizationService from '../../services/AuthorizationService';
import SignInPageStyle from '../sign-in/SignInPageStyle';

const ResetPasswordInitiatePage = (props) => {
  const { classes } = props;
  const [alreadySend, setAlreadySend] = useState(false);
  const forEmailInput = getForInput({ placeholder: 'Email' });
  const resetPassword = async () => {
    await AuthorizationService.initiateResetPassword(forEmailInput.value);
    setAlreadySend(true);
  };

  return (
    <div className={classes.page}>
      <div className={classes.form}>
        <div className={classes.formField}>Reset Password</div>
        <Input className={classes.formField} {...forEmailInput}/>
        { alreadySend ? <div className={classes.formField}>
          We send a mail with link to reset a password, please check your email
        </div> : null }
        <div className={classes.formField}>
          <Button
            className={classes.actionButton}
            onClick={resetPassword}
          >
            { !alreadySend ? 'Send Email' : 'Send Email Again' }
          </Button>
        </div>
      </div>
    </div>
  );
};

ResetPasswordInitiatePage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default withRouter(withStyles(SignInPageStyle)(ResetPasswordInitiatePage));
