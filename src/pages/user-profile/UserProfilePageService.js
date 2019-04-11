import UserService from '../../services/UserService';

export default class UserProfilePageService {
  static async getUser(userId) {
    return UserService.getUser(userId);
  }
}
