import FormStyles from '../../components/form/FormStyles';

export default (theme) => {
  const formStyles = FormStyles(theme);

  return {
    ...formStyles,
    page: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    actionButton: {
      marginRight: '10px',
      '&:last-of-type': {
        marginRight: '0',
      },
    },
  };
};
