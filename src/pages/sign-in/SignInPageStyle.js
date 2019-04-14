import { FormStyles } from '@zenvo/core-ui';

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
    resetPasswordLink: {
      color: theme.linkColor || '#1F7BBD',
      cursor: 'pointer',
      border: 'none',
    },
  };
};
