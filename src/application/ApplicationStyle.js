import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTwitter,
  faFacebook,
  faLinkedin,
  faVk,
  faInstagram,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';

library.add(faTwitter);
library.add(faFacebook);
library.add(faLinkedin);
library.add(faVk);
library.add(faInstagram);
library.add(faGoogle);

export default {
  applicationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  application: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '1200px',
    width: '100%',
  },
  '@keyframes blink': {
    '0%': {
      backgroundColor: 'rgba(204,204,204, 0)',
    },
    '10%': {
      backgroundColor: 'rgba(204,204,204, 0.5)',
    },
    '100%': {
      backgroundColor: 'rgba(204,204,204, 0)',
    },
  },
};
