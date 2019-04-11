import UserService from '../../services/UserService';

export default class UserProfilePageService {
  static async getUsers() {
    return UserService.getUsers();
  }
}
