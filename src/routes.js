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
