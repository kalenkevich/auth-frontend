import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import HeaderComponentStyle from '../components/header/HeaderComponentStyle';

export const ApplicationLoadingStyles = (theme) => {
  const headerStyle = HeaderComponentStyle(theme);

  return ({
    root: {
      width: '100%',
      height: '100%',
    },
    header: {
      ...headerStyle.headerContainer,
      border: 'none',
      ...theme.loading,
    },
    content: {
      ...theme.loading,
      borderRadius: theme.borderRadius,
      width: '100%',
      height: '100%',
    },
  });
};

const ApplicationLoadingComponent = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.header}/>
    <div className={classes.content}/>
  </div>
);

ApplicationLoadingComponent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(ApplicationLoadingStyles)(ApplicationLoadingComponent);
