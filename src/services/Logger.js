import { Environment } from '../../config/settings';

const isProduction = Environment === 'production';

export default class Logger {
  static info(message) {
    if (!isProduction) {
      // eslint-disable-next-line no-console
      console.log(message);
    }
  }

  static warn(message) {
    if (!isProduction) {
      // eslint-disable-next-line no-console
      console.warn(message);
    }
  }

  static error(message) {
    if (!isProduction) {
      // eslint-disable-next-line no-console
      console.error(message);
    }
  }
}
