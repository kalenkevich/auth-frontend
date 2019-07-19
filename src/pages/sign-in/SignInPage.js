import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { withRouter } from 'react-router-dom';
import {
  Input,
  Button,
  Label,
  Form,
  FormSection,
} from '@zenvo/core-ui';
import SocialPanel from '../../components/social-panel';
import SocialAuthorizationService from '../../services/SocialAuthorizationService';
import AuthorizationContext from '../../context/AuthorizationContext';
import SignInPageStyle from './SignInPageStyle';

const SignInPage = (props) => {
  const { classes, history } = props;
  const { signIn } = useContext(AuthorizationContext);
  const forErrorLabel = getForErrorLabel();
  const forEmailInput = getForInput({ placeholder: 'example@mail.com', label: 'Email' });
  const forPasswordInput = getForInput({ placeholder: 'Your password here', label: 'Password', type: 'password' });
  const rawReturnUrl = new URLSearchParams(history.location.search).get('returnUrl');
  const returnUrl = rawReturnUrl && decodeURIComponent(rawReturnUrl);
  const trySignIn = async () => {
    const [, error] = await signIn(forEmailInput.value, forPasswordInput.value);

    if (error) {
      return forErrorLabel.setSignUpError(error.message);
    } if (returnUrl) {
      window.location.href = returnUrl;
    } else {
      history.push('/user/me');
    }
  };
  const resetPassword = () => {
    localStorage.setItem('returnUrl', JSON.stringify(returnUrl));

    history.push('/reset/password/initiate');
  };
  const onSocialButtonClick = async (provider) => {
    localStorage.setItem('returnUrl', JSON.stringify(returnUrl));

    return SocialAuthorizationService.initiateSocialSignIn(provider);
  };

  return (
    <div className={classes.page}>
      <Form title='Sign In' className={classes.form}>
        <FormSection className={classes.center}>
          <SocialPanel
            className={classes.formField}
            onClick={onSocialButtonClick}
          />
        </FormSection>
        <FormSection>
          <Label {...forErrorLabel}/>
        </FormSection>
        <FormSection>
          <Input {...forEmailInput}/>
        </FormSection>
        <FormSection>
          <Input {...forPasswordInput}/>
        </FormSection>
        <FormSection>
          <Button className={classes.actionButton}
            onClick={resetPassword}
            type='link'
          >
            Forgot password?
          </Button>
        </FormSection>
        <FormSection className={classes.center}>
          <Button onClick={trySignIn}
            type='primary'
            className={classes.actionButton}
          >
            Sign In
          </Button>
          <Button onClick={() => history.push('/sign-up')}
            className={classes.actionButton}
            type='secondary'
          >
            Sign Up
          </Button>
        </FormSection>
      </Form>
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
