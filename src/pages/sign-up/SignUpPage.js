import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { withRouter } from 'react-router-dom';
import { Input, Button, Label } from '@zenvo/core-ui';
import { getForErrorLabel, getForInput } from '../sign-in/SignInPage';
import SocialPanel from '../../components/social-panel';
import SignUpPageStyle from './SignUpPageStyle';
import AuthorizationContext from '../../context/AuthorizationContext';
import SocialAuthorizationService from '../../services/SocialAuthorizationService';

const SignUpPage = (props) => {
  const { classes, history } = props;
  const forErrorLabel = getForErrorLabel();
  const { signUp } = useContext(AuthorizationContext);
  const forNameInput = getForInput({ placeholder: 'Full Name' });
  const forEmailInput = getForInput({ placeholder: 'Email' });
  const forPasswordInput = getForInput({ placeholder: 'Password', type: 'password' });
  const forRepeatPasswordInput = getForInput({ placeholder: 'Repeat Password', type: 'password' });
  const rawReturnUrl = new URLSearchParams(history.location.search).get('returnUrl');
  const returnUrl = rawReturnUrl && decodeURIComponent(rawReturnUrl);
  const trySignUp = async () => {
    if (forPasswordInput.value !== forRepeatPasswordInput.value) {
      return forErrorLabel.setSignUpError('Password and Repeat Password don\'t match');
    } else {
      const [, error] = await signUp(forNameInput.value, forEmailInput.value, forPasswordInput.value);

      if (error) {
        return forErrorLabel.setSignUpError(error.message);
      }

      if (returnUrl) {
        localStorage.setItem('returnUrl', JSON.stringify(returnUrl));
      }

      history.push('/verify/email/initiate');
    }
  };
  const onSocialButtonClick = async (provider) => {
    localStorage.setItem('returnUrl', JSON.stringify(returnUrl));

    return SocialAuthorizationService.initiateSocialSignIn(provider);
  };

  return (
    <div className={classes.page}>
      <div className={classes.form}>
        <div className={classes.formField}>Sign Up</div>
        <SocialPanel
          className={classes.formField}
          onClick={onSocialButtonClick}
        />
        <Label className={classes.formLabel} {...forErrorLabel}/>
        <Input className={classes.formField} {...forNameInput}/>
        <Input className={classes.formField} {...forEmailInput}/>
        <Input className={classes.formField} {...forPasswordInput}/>
        <Input className={classes.formField} {...forRepeatPasswordInput}/>
        <div className={classes.formField}>
          <Button onClick={trySignUp}
            className={classes.actionButton}
          >
              Sign Up
          </Button>
          <Button onClick={() => history.push('/sign-in')}
            className={classes.actionButton}
          >
              Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

SignUpPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default withRouter(withStyles(SignUpPageStyle)(SignUpPage));
