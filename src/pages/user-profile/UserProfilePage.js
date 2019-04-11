import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { withRouter } from 'react-router-dom';
import UserProfile from '../../components/user-profile';
import UserProfilePageStyle from './UserProfilePageStyle';
import UserProfilePageService from './UserProfilePageService';
import AuthorizationContext from '../../context/AuthorizationContext';

const UserProfilePage = (props) => {
  const { classes, match } = props;
  const { userId: userIdParam } = match.params;
  const { user: authorizedUser } = useContext(AuthorizationContext);
  const userId = userIdParam === 'me' ? authorizedUser.id : userIdParam;
  const {
    user,
    isLoading,
  } = getForUser(userId, authorizedUser);

  return (
    <>
      <UserProfile
        className={classes.userProfile}
        user={user}
        isLoading={isLoading}
      />
    </>
  );
};

export const getForUser = (id) => {
  const [user, setUser] = useState({});
  const [isLoading, setLoadingState] = useState(false);
  const fetchUser = async (userId) => {
    setLoadingState(true);

    const user = await UserProfilePageService.getUser(userId);

    setUser(user);

    setLoadingState(false);
  };

  useEffect(() => {
    fetchUser(id);
  }, []);

  return {
    user,
    isLoading,
  };
};

UserProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object,
};

export default withRouter(withStyles(UserProfilePageStyle)(UserProfilePage));
