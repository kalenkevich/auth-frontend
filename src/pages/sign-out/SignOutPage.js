import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { withRouter } from 'react-router-dom';
import { Input, Button, Label } from '@zenvo/core-ui';
import AuthorizationContext from '../../context/AuthorizationContext';

const SignOutPageStyle = {
  page: {

  },
};

const SignOutPage = (props) => {
  const { classes, history } = props;
  const { signOut } = useContext(AuthorizationContext);
  const trySignOut = async () => {
    const [, error] = await signOut();
    const rawReturnUrl = new URLSearchParams(history.location.search).get('returnUrl');
    const returnUrl = rawReturnUrl && decodeURIComponent(rawReturnUrl);

    if (error) {
      return ;
    }

    if (returnUrl) {
      window.location.href = returnUrl
    } else {
      history.push(`/sign-in`);
    }
  };

  useEffect(() => {
    trySignOut();
  }, []);

  return <div className={classes.page}>...Loading</div>;
};

SignOutPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default withRouter(withStyles(SignOutPageStyle)(SignOutPage));
