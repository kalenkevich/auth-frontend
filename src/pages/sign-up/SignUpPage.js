import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { withRouter } from 'react-router-dom';
import Input from '../../components/common/input';
import Button from '../../components/common/button';
import Label from '../../components/common/label';
import { getForErrorLabel, getForInput } from '../sign-in/SignInPage';
import SignUpPageStyle from './SignUpPageStyle';
import AuthorizationContext from '../../context/AuthorizationContext';

const SignUpPage = (props) => {
  const { classes, history } = props;
  const forErrorLabel = getForErrorLabel();
  const { signUp } = useContext(AuthorizationContext);
  const forNameInput = getForInput({ placeholder: 'Full Name' });
  const forEmailInput = getForInput({ placeholder: 'Email' });
  const forPasswordInput = getForInput({ placeholder: 'Password', type: 'password' });
  const forRepeatPasswordInput = getForInput({ placeholder: 'Repeat Password', type: 'password' });
  const trySignUp = async () => {
    const [, error] = await signUp(forNameInput.value, forEmailInput.value, forPasswordInput.value);

    if (error) {
      forErrorLabel.setSignUpError(error.message);
    }
  };

  return (
    <div className={classes.page}>
      <div className={classes.form}>
        <div className={classes.formField}>Sign Up</div>
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
