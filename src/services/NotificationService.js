export const NOTIFICATION_TYPES = {
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  SUCCESS: 'SUCCESS',
  INFO: 'INFO',
};

export default class NotificationService {
  static showErrorNotification(message) {
    return this.showNotification(message, NOTIFICATION_TYPES.ERROR);
  }

  static showWargingNotification(message) {
    return this.showNotification(message, NOTIFICATION_TYPES.WARNING);
  }

  static showSuccessNotification(message) {
    return this.showNotification(message, NOTIFICATION_TYPES.SUCCESS);
  }

  static showInfoNotification(message) {
    return this.showNotification(message, NOTIFICATION_TYPES.INFO);
  }

  static showNotification() {

  }

  static hideNotification() {

  }
}
