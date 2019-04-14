import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { withRouter } from 'react-router-dom';
import AuthorizationContext from '../../context/AuthorizationContext';
import SocialAuthorizationService from '../../services/SocialAuthorizationService';

const SocialCallbackPage = (props) => {
  const { match, history } = props;
  const { provider } = match.params;
  const { signInWith } = useContext(AuthorizationContext);

  const tryToSignIn = async () => {
    const code = SocialAuthorizationService.getSocialCodeFromUrl(provider);
    const [, error] = await signInWith(provider, code);
    const returnUrl = JSON.parse(localStorage.getItem('returnUrl'));

    if (error) {
      return;
    } if (returnUrl) {
      localStorage.removeItem('returnUrl');

      window.location.href = returnUrl;
    } else {
      history.push('/user/me');
    }
  };

  useEffect(() => {
    tryToSignIn();
  }, []);

  return <div>...Loading</div>;
};

SocialCallbackPage.propTypes = {
  classes: PropTypes.object,
};

export default withRouter(withStyles({})(SocialCallbackPage));
