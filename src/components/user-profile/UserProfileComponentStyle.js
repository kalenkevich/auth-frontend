export default theme => ({
  userProfilePageContainer: {
    display: 'flex',
    border: theme.border,
    borderRadius: theme.borderRadius,
    padding: '5px',
  },
  userRate: {
    marginTop: '10px',
  },
  userAvatarUrl: {
    width: '150px',
    height: '150px',
    objectFit: 'contain',
  },
  userName: {
    fontSize: '24px',
  },
  userDetails: {
    marginLeft: '20px',
    '& > *': {
      marginTop: '10px',
      '&:first-of-type': {
        marginTop: '0',
      },
    },
  },
  userDescription: {
    marginTop: '10px',
  },
});
