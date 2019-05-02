import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { Avatar, LabeledText } from '@zenvo/core-ui';
import UserProfileComponentStyle from './UserProfileComponentStyle';

const UserProfileComponent = (props) => {
  const {
    classes,
    className,
    user,
  } = props;

  return (
    <div className={`${className} ${classes.userProfilePageContainer}`}>
        <Avatar
          className={classes.userAvatarUrl}
          url={user.avatarUrl}
          size='lg'
        />
      <div className={classes.userDetails}>
        <LabeledText label={'Name'} content={user.name}/>
        <LabeledText label={'Email'} content={user.email}/>
        <LabeledText label={'Roles'} content={(user.roles || []).join(', ')}/>
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
