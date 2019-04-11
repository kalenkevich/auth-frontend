import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import Icon from '../../components/common/icon';
import UsersPageStyles from './UsersPageStyle';
import UsersPageService from './UsersPageService';
import AuthorizationContext from '../../context/AuthorizationContext';

const UsersPage = ({ classes }) => {
  const [ users, setUsers ] = useState([]);
  const { user: authorizedUser } = useContext(AuthorizationContext);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await UsersPageService.getUsers();

      setUsers(fetchedUsers);
    } catch (error) {

    } finally {

    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={classes.root}>
      {(users || []).map(user => (
        <div className={classes.user} key={user.id}>
          <Icon
            className={classes.userAvatar}
            src={user.avatarUrl}
            type={'USER_ICON'}
          />
          <div className={classes.userName}>
            { user.id === authorizedUser.id ? `${user.name} (Me)` : user.name }
          </div>
          <div className={classes.userRoles}>
            {(user.roles || []).map(role => <div key={role} className={classes.userRole}>{role}</div>)}
          </div>
          <div className={classes.userApplications}>
            {(user.applications || []).map(app => <div key={app} className={classes.userApplication}>{app}</div>)}
          </div>
          <div className={classes.actionPanel}>
            actions
          </div>
        </div>
      ))}
    </div>
  );
};

UsersPage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(UsersPageStyles)(UsersPage);
