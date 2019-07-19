import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import {
  Avatar,
  LabeledText,
  Card,
  Dropdown,
  OptionItem,
} from '@zenvo/core-ui';
import UsersPageStyles from './UsersPageStyle';
import UsersPageService from './UsersPageService';
import AuthorizationContext from '../../context/AuthorizationContext';
import Logger from '../../services/Logger';

const UsersPage = ({ classes, history }) => {
  const [users, setUsers] = useState([]);
  const { user: authorizedUser } = useContext(AuthorizationContext);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await UsersPageService.getUsers();

      setUsers(fetchedUsers);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const actionOptions = [{
    label: 'Go to profile',
    value: 'profile',
    onClick: user => history.push(`/user/${user.id}`),
  }, {
    label: 'Deactivate (coming soon)',
    value: 'deactivate',
    disabled: true,
    onClick: user => history.push(`/user/${user.id}`),
  }];

  return (
    <div className={classes.root}>
      {(users || []).map(user => (
        <Card className={classes.user} key={user.id}>
          <Avatar
            className={classes.userAvatar}
            url={user.avatarUrl}
            size='sm'
          />
          <LabeledText
            className={classes.userName}
            label={'Name'}
            content={user.id === authorizedUser.id ? `${user.name} (Me)` : user.name }
          />
          <LabeledText
            className={classes.userName}
            label={'Email'}
            content={user.email}
          />
          <LabeledText
            className={classes.userRoles}
            label={'Roles'}
            content={(user.roles || []).join(', ')}
          />
          <div className={classes.userActionsWrapper}>
            <Dropdown
              label='Actions'
              className={classes.userActions}
            >
              {(actionOptions || []).map((option, index) => (
                <OptionItem
                  key={index}
                  {...option}
                />
              ))}
            </Dropdown>
          </div>
        </Card>
      ))}
    </div>
  );
};

UsersPage.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object,
};

export default withStyles(UsersPageStyles)(UsersPage);
