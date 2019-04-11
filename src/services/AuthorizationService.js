import gql from 'graphql-tag';
import UserFragment from '../fragments/userFragment';
import BackendGraphQLConnector from './BackendGraphQLConnector';

export default class AuthorizationService {
  static async authorize() {
    const { authorize: user } = await BackendGraphQLConnector.query({
      query: gql`
        query Authorize {
          authorize {
            ...UserFragment
          }
        }
        ${UserFragment}
      `,
    });

    return user;
  }

  static async signUp(name, email, password) {
    const { signUp: user } = await BackendGraphQLConnector.mutate({
      variables: {
        signUpData: {
          name,
          email,
          password,
        },
      },
      mutation: gql`
        mutation SignUp($signUpData: UserSignUpInput!) {
          signUp(signUpData: $signUpData) {
            ...UserFragment
          }
        }
        ${UserFragment}
      `,
    });

    return user;
  }

  static async signIn(email, password) {
    const { signIn: user } = await BackendGraphQLConnector.mutate({
      variables: {
        signInData: {
          email,
          password,
        },
      },
      mutation: gql`
        mutation SignIn($signInData: UserSignInInput!) {
          signIn(signInData: $signInData) {
            ...UserFragment
          }
        }
        ${UserFragment}
      `,
    });

    return user;
  }

  static async signOut() {
    const { signOut: result } = await BackendGraphQLConnector.query({
      query: gql`
          query SignOut {
            signOut
        }
      `,
    });

    return result;
  }
}
