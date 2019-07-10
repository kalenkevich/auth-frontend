export default (theme) => ({
  page: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    maxWidth: '600px',
  },
  center: {
    '& > div': {
      justifyContent: 'center',
    },
  },
  actionButton: {
    marginRight: '10px',
    '&:last-of-type': {
      marginRight: '0',
    },
  },
  resetPasswordLink: {
    color: theme.linkColor || '#1F7BBD',
    cursor: 'pointer',
    border: 'none',
  },
});
