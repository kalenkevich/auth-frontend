export default theme => ({
  headerContainer: {
    height: '40px',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    border: `1px solid ${theme.brandPrimaryColor}`,
    borderRadius: theme.borderRadius,
  },
  brandTitle: {
    fontSize: '24px',
    textDecoration: 'none',
    color: theme.titleColor,
    '&:hover': {
      color: theme.titleHoverColor,
    },
  },
  userPanel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  userAvatar: {},
  userName: {
    width: '100px',
    marginLeft: '10px',
  },
  actionPanel: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  actionPanelButton: {
    marginRight: '10px',
    '&:last-of-type': {
      marginRight: '0',
    },
  },
});
