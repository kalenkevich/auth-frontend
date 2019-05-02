export default (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
  },
  user: {
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    marginBottom: '20px',
    border: theme.border,
    borderRadius: theme.borderRadius,
  },
  userAvatar: {
    borderRadius: theme.borderRadius,
    width: '50px',
  },
  userName: {
    marginLeft: '20px',
    width: '20%',
    overflowWrap: 'break-word',
    flexGrow: '0',
    flexShrink: '0',
  },
  userRoles: {
    marginLeft: '20px',
    width: '20%',
    flexGrow: '0',
    flexShrink: '0',
  },
  userActionsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  userActions: {
    cursor: 'pointer',
    width: '150px',
    marginRight: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  actionPanel: {
    width: '20%',
  },
});
