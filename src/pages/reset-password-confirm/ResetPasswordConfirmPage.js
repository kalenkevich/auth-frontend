import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { withRouter } from 'react-router-dom';
import { Button, Input, Label } from '@zenvo/core-ui';
import { getForErrorLabel, getForInput } from '../sign-in/SignInPage';
import UserService from '../../services/UserService';
import AuthorizationContext from '../../context/AuthorizationContext';
import SignInPageStyle from '../sign-in/SignInPageStyle';

const ResetPasswordConfirmPage = (props) => {
  const { classes, history } = props;
  const forErrorLabel = getForErrorLabel();
  const forPasswordInput = getForInput({ placeholder: 'Password', type: 'password' });
  const forRepeatPasswordInput = getForInput({ placeholder: 'Repeat Password', type: 'password' });
  const { signIn } = useContext(AuthorizationContext);
  const rawEmail = new URLSearchParams(history.location.search).get('email');
  const rawToken = new URLSearchParams(history.location.search).get('token');
  const email = rawEmail && decodeURIComponent(rawEmail);
  const verificationToken = rawToken && decodeURIComponent(rawToken);

  const resetPassword = async () => {
    if (email && verificationToken && forPasswordInput.value && forRepeatPasswordInput.value) {
      if (forPasswordInput.value !== forRepeatPasswordInput.value) {
        return forErrorLabel.setSignUpError('Password and Repeat Password don\'t match');
      } else {
        const result = await UserService.confirmResetPassword(email, verificationToken, forPasswordInput.value);

        if (result) {
          const returnUrl = JSON.parse(localStorage.getItem('returnUrl'));
          const [, error] = await signIn(email, forPasswordInput.value);

          if (error) {
            return forErrorLabel.setSignUpError(error.message);
          } if (returnUrl) {
            window.location.href = returnUrl
          } else {
            history.push(`/user/me`);
          }
        } else {
          return forErrorLabel.setSignUpError('Something wet wrong :(');
        }
      }
    } else {
      return forErrorLabel.setSignUpError('Please fill all fields');
    }
  };

  return (
    <div className={classes.page}>
      <div className={classes.form}>
        <div className={classes.formField}>Reset Password for <br/><b>{email}</b></div>
        <Label className={classes.formLabel} {...forErrorLabel}/>
        <Input className={classes.formField} {...forPasswordInput}/>
        <Input className={classes.formField} {...forRepeatPasswordInput}/>
        <div className={classes.formField}>
          <Button
            className={classes.actionButton}
            onClick={resetPassword}
          >
            Reset Password
          </Button>
        </div>
      </div>
    </div>
  );
};

ResetPasswordConfirmPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default withRouter(withStyles(SignInPageStyle)(ResetPasswordConfirmPage));
