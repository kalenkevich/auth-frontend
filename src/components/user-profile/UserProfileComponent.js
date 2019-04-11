import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import Icon from '../common/icon';
import UserProfileComponentStyle from './UserProfileComponentStyle';

const UserProfileComponent = (props) => {
  const {
    classes,
    className,
    user,
  } = props;

  return (
    <div className={`${className} ${classes.userProfilePageContainer}`}>
      <div>
        <Icon
          className={classes.userAvatarUrl}
          src={user.avatarUrl}
          width={150}
          height={150}
          type={'USER_ICON'}
        />
      </div>
      <div className={classes.userDetails}>
        <div className={classes.userName}>{user.name}</div>
        <div className={classes.userRoles}>
          {(user.roles || []).map(role => <div key={role} className={classes.userRole}>{role}</div>)}
        </div>
        <div className={classes.userApplications}>
          {(user.applications || []).map(app => <div key={app} className={classes.userApplication}>{app}</div>)}
        </div>
      </div>
    </div>
  );
};

UserProfileComponent.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  user: PropTypes.object,
};

export default withStyles(UserProfileComponentStyle)(UserProfileComponent);
