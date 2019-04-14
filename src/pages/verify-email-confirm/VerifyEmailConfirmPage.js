import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { withRouter } from 'react-router-dom';
import AuthorizationService from '../../services/AuthorizationService';

const VerifyEmailConfirmPageStyles = {
  page: {},
};

const VerifyEmailConfirmPage = (props) => {
  const { classes, history } = props;
  const verifyEmail = async () => {
    const rawVerificationToken = new URLSearchParams(history.location.search).get('token');
    const verificationToken = rawVerificationToken && decodeURIComponent(rawVerificationToken);

    if (verificationToken) {
      try {
        await AuthorizationService.verifyEmail(verificationToken);

        const returnUrl = JSON.parse(localStorage.getItem('returnUrl'));

        if (returnUrl) {
          localStorage.removeItem('returnUrl');

          return window.location.href = returnUrl;
        }

        history.push('/user/me');
      } catch (error) {

      }
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return <div className={classes.page}>
    ...Please wait
  </div>;
};

VerifyEmailConfirmPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default withRouter(withStyles(VerifyEmailConfirmPageStyles)(VerifyEmailConfirmPage));
