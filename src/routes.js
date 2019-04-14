import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import AuthorizationContext from './context/AuthorizationContext';

export const ProtectedRoute = ({ component: RouteComponent, canAccess, redirectTo = '/sign-in', ...rest }) => (
  <Route {...rest} render={props => (canAccess ? <RouteComponent {...props} /> : <Redirect to={redirectTo}/>)}/>
);
export const SingInPage = loadable(
  () => import(/* webpackChunkName: "SingInPage" */ './pages/sign-in'),
);
export const SingUpPage = loadable(
  () => import(/* webpackChunkName: "SingUpPage" */ './pages/sign-up'),
);
export const SingOutPage = loadable(
  () => import(/* webpackChunkName: "SingOutPage" */ './pages/sign-out'),
);
export const VerifyEmailInitiatePage = loadable(
  () => import(/* webpackChunkName: "VerifyEmailInitiatePage" */ './pages/verify-email-initiate'),
);
export const VerifyEmailConfirmPage = loadable(
  () => import(/* webpackChunkName: "VerifyEmailConfirmPage" */ './pages/verify-email-confirm'),
);
export const ResetPasswordInitiatePage = loadable(
  () => import(/* webpackChunkName: "VerificationWaitPage" */ './pages/reset-password-initiate'),
);
export const ResetPasswordConfirmPage = loadable(
  () => import(/* webpackChunkName: "VerifyEmailPage" */ './pages/reset-password-confirm'),
);
export const SocialCallbackPage = loadable(
  () => import(/* webpackChunkName: "SocialCallbackPage" */ './pages/social-callback'),
);
export const UserProfilePage = loadable(
  () => import(/* webpackChunkName: "UserProfilePage" */ './pages/user-profile'),
);
export const UsersPage = loadable(
  () => import(/* webpackChunkName: "UsersPage" */ './pages/users'),
);

export default () => {
  const { user } = useContext(AuthorizationContext);
  const isUserAuthorized = !!user;
  const isAdminOrManager = user && ((user.roles || []).includes('ZENVO_ADMIN') || (user.roles || []).includes('ZENVO_MANAGER'));

  return (
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
  );
}
