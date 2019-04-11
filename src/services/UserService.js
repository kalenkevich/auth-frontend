import gql from 'graphql-tag';
import BackendGraphQLConnector from './BackendGraphQLConnector';
import UserFragment from '../fragments/userFragment';

export default class UserProfilePageService {
  static async getUsers() {
    const { getAllUsers: users } = await BackendGraphQLConnector.query({
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

  static async getUser(userId) {
    const { getUser: user } = await BackendGraphQLConnector.query({
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
