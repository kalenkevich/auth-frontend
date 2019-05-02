import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTwitter,
  faFacebook,
  faLinkedin,
  faVk,
  faInstagram,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import {
  faSave,
  faUndo,
  faPlus,
  faUser,
  faSignOutAlt,
  faCommentAlt,
  faTimes,
  faPencilAlt,
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faBell,
} from '@fortawesome/free-solid-svg-icons';

library.add(faTwitter);
library.add(faFacebook);
library.add(faLinkedin);
library.add(faVk);
library.add(faInstagram);
library.add(faGoogle);
library.add(faSave);
library.add(faUndo);
library.add(faPlus);
library.add(faUser);
library.add(faTimes);
library.add(faPencilAlt);
library.add(faCommentAlt);
library.add(faSignOutAlt);
library.add(faChevronUp);
library.add(faChevronDown);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faBell);

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
