import React, { useContext, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { lazy } from '@loadable/component';
import AuthorizationContext from './context/AuthorizationContext';

export const ProtectedRoute = ({component: RouteComponent, canAccess, redirectTo = '/sign-in', ...rest}) => (
  <Route {...rest} render={props => (canAccess ? <RouteComponent {...props} /> : <Redirect to={redirectTo}/>)}/>
);
export const SingInPage = lazy(
  () => import(/* webpackChunkName: "SingInPage" */ './pages/sign-in'),
);
export const SingUpPage = lazy(
  () => import(/* webpackChunkName: "SingUpPage" */ './pages/sign-up'),
);
export const SingOutPage = lazy(
  () => import(/* webpackChunkName: "SingOutPage" */ './pages/sign-out'),
);
export const VerifyEmailInitiatePage = lazy(
  () => import(/* webpackChunkName: "VerifyEmailInitiatePage" */ './pages/verify-email-initiate'),
);
export const VerifyEmailConfirmPage = lazy(
  () => import(/* webpackChunkName: "VerifyEmailConfirmPage" */ './pages/verify-email-confirm'),
);
export const ResetPasswordInitiatePage = lazy(
  () => import(/* webpackChunkName: "VerificationWaitPage" */ './pages/reset-password-initiate'),
);
export const ResetPasswordConfirmPage = lazy(
  () => import(/* webpackChunkName: "VerifyEmailPage" */ './pages/reset-password-confirm'),
);
export const SocialCallbackPage = lazy(
  () => import(/* webpackChunkName: "SocialCallbackPage" */ './pages/social-callback'),
);
export const UserProfilePage = lazy(
  () => import(/* webpackChunkName: "UserProfilePage" */ './pages/user-profile'),
);
export const UsersPage = lazy(
  () => import(/* webpackChunkName: "UsersPage" */ './pages/users'),
);

Route.propTypes.component = PropTypes.oneOfType([
  Route.propTypes.component,
  PropTypes.object,
]);

export default () => {
  const {user} = useContext(AuthorizationContext);
  const isUserAuthorized = !!user;
  const isAdminOrManager = user && ((user.roles || []).includes('ZENVO_ADMIN') || (user.roles || []).includes('ZENVO_MANAGER'));

  return (
    <Suspense fallback={<div></div>}>
      <Switch>
        <Route
          component={SingInPage}
          path={'/sign-in'}
          exact={true}
        />
        <Route
          component={SingUpPage}
          path={'/sign-up'}
          exact={true}
        />
        <Route
          component={SingOutPage}
          path={'/sign-out'}
          exact={true}
        />
        <Route
          component={VerifyEmailInitiatePage}
          path={'/verify/email/initiate'}
          exact={true}
        />
        <Route
          component={VerifyEmailConfirmPage}
          path={'/verify/email/confirm'}
          exact={true}
        />
        <Route
          component={ResetPasswordInitiatePage}
          path={'/reset/password/initiate'}
          exact={true}
        />
        <Route
          component={ResetPasswordConfirmPage}
          path={'/reset/password/confirm'}
          exact={true}
        />
        <Route
          component={SocialCallbackPage}
          path={'/social/:provider/callback'}
          exact={true}
        />
        <ProtectedRoute
          canAccess={isUserAuthorized}
          component={UserProfilePage}
          path={'/user/:userId'}
          exact={true}
        />
        <ProtectedRoute
          canAccess={isAdminOrManager}
          component={UsersPage}
          redirectTo={'/'}
          path={'/users'}
          exact={true}
        />
        <Redirect
          from={'/'}
          to={'/user/me'}
        />
      </Switch>
    </Suspense>
  );
}
