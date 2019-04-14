import gql from 'graphql-tag';
import { UserFragment } from '@zenvo/core-ui';
import BackendGraphQLConnector from './BackendGraphQLConnector';

class UserProfilePageService {
  constructor(backendGraphQLConnector) {
    this.backendGraphQLConnector = backendGraphQLConnector;
  }

  async getUsers() {
    const { getAllUsers: users } = await this.backendGraphQLConnector.query({
      query: gql`
        query GetAllUsers {
          getAllUsers{
            ...UserFragment
          }
        }
        ${UserFragment}
      `,
    });

    return users;
  }

  async getUser(userId) {
    const { getUser: user } = await this.backendGraphQLConnector.query({
      variables: { userId: parseInt(userId, 10) },
      query: gql`
        query GetUserAndPosts($userId: Float!) {
          getUser(userId: $userId) {
            ...UserFragment
          }
        }
        ${UserFragment}
      `,
    });

    return user;
  }
}

export default new UserProfilePageService(BackendGraphQLConnector);
