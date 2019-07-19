export default (theme) => ({
  page: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    maxWidth: '300px',
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
});
