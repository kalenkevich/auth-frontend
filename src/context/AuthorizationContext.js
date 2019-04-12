import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AuthorizationService from '../services/AuthorizationService';
import ApplicationLoading from '../application/ApplicationLoadingComponent';

const AuthorizationContext = React.createContext({
  user: null,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
});

export const AuthorizationProvider = AuthorizationContext.Provider;

export const AuthorizationConsumer = AuthorizationContext.Consumer;

const AuthorizationComponent = ({ children, history }) => {
  const [authorizedUser, setAuthorizedUser] = useState(null);
  const [authorizationProcess, setAuthorizationProcessState] = useState(true);
  const authorize = async () => {
    let user = null;
    let error = null;

    try {
      user = await AuthorizationService.authorize();

      setAuthorizedUser(user);
    } catch (e) {
      error = e;
    } finally {
      setAuthorizationProcessState(false);
    }

    return [user, error];
  };
  const signIn = async (...args) => {
    let user = null;
    let error = null;

    try {
      user = await AuthorizationService.signIn(...args);

      setAuthorizedUser(user);
    } catch (e) {
      error = e;
    } finally {
      setAuthorizationProcessState(false);
    }

    return [user, error];
  };
  const signUp = async (...args) => {
    let user = null;
    let error = null;

    try {
      user = await AuthorizationService.signUp(...args);

      setAuthorizedUser(user);
    } catch (e) {
      error = e;
    } finally {
      setAuthorizationProcessState(false);
    }

    return [user, error];
  };
  const signOut = async (...args) => {
    let user = authorizedUser;
    let error = null;

    try {
      await AuthorizationService.signOut(...args);

      setAuthorizedUser(null);
      user = null;
    } catch (e) {
      error = e;
    } finally {
      setAuthorizationProcessState(false);
    }

    return [user, error];
  };
  useEffect(() => {
    authorize();
  }, []);

  return authorizationProcess ? <ApplicationLoading/> : (
    <AuthorizationProvider value={{
      user: authorizedUser,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthorizationProvider>
  );
};

AuthorizationComponent.propTypes = {
  children: PropTypes.node,
  history: PropTypes.object,
};

export const Authorization = withRouter(AuthorizationComponent);

export default AuthorizationContext;
