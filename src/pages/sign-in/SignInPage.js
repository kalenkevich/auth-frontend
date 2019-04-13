import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { withRouter } from 'react-router-dom';
import { Input, Button, Label } from '@zenvo/core-ui';
import AuthorizationContext from '../../context/AuthorizationContext';
import SignInPageStyle from './SignInPageStyle';

const SignInPage = (props) => {
  const { classes, history } = props;
  const { signIn } = useContext(AuthorizationContext);
  const forErrorLabel = getForErrorLabel();
  const forEmailInput = getForInput({ placeholder: 'Email' });
  const forPasswordInput = getForInput({ placeholder: 'Password', type: 'password' });
  const trySignIn = async () => {
    const [, error] = await signIn(forEmailInput.value, forPasswordInput.value);
    const rawReturnUrl = new URLSearchParams(history.location.search).get('returnUrl');
    const returnUrl = rawReturnUrl && decodeURIComponent(rawReturnUrl);

    if (error) {
      return forErrorLabel.setSignUpError(error.message);
    } if (returnUrl) {
      window.location.href = returnUrl
    } else {
      history.push('/user/me');
    }
  };

  return (
    <div className={classes.page}>
      <div className={classes.form}>
        <div className={classes.formField}>Sign In</div>
        <Label className={classes.formLabel} {...forErrorLabel}/>
        <Input className={classes.formField} {...forEmailInput}/>
        <Input className={classes.formField} {...forPasswordInput}/>
        <div className={classes.formField}>
          <Button onClick={trySignIn}
            className={classes.actionButton}
          >
            Sign In
          </Button>
          <Button onClick={() => history.push('/sign-up')}
            className={classes.actionButton}
          >
            Sign Up
          </Button>
        </div>
        <div className={classes.formField}>
          <div className={`${classes.formField} ${classes.resetPasswordLink}`}
            onClick={() => history.push('/reset/password/initiate')}
          >
            Forgot password?
          </div>
        </div>
      </div>
    </div>
  );
};

export const getForInput = (props) => {
  const [value, setValue] = useState('');

  return {
    ...props,
    value,
    onChange: event => setValue(event.target.value),
  };
};

export const getForErrorLabel = () => {
  const [signUpError, setSignUpError] = useState(null);

  return {
    type: 'error',
    value: signUpError,
    setSignUpError,
  };
};

SignInPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default withRouter(withStyles(SignInPageStyle)(SignInPage));
