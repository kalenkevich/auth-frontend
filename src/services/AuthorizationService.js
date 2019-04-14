import gql from 'graphql-tag';
import { UserFragment } from '@zenvo/core-ui';
import backendGraphQLConnector from './BackendGraphQLConnector';

export default class AuthorizationService {
  static async authorize() {
    const { authorize: user } = await backendGraphQLConnector.query({
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
    const { signUp: user } = await backendGraphQLConnector.mutate({
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
    const { signIn: user } = await backendGraphQLConnector.mutate({
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
    const { signOut: result } = await backendGraphQLConnector.query({
      query: gql`
        query SignOut {
          signOut
        }
      `,
    });

    return result;
  }

  static async verifyEmail(verificationToken) {
    const { verifyEmail: result } = await backendGraphQLConnector.query({
      variables: { verificationToken },
      query: gql`
        query VerifyEmail($verificationToken: String!) {
          verifyEmail(verificationToken: $verificationToken)
        }
      `,
    });

    return result;
  }

  static async resendVerificationEmail() {
    const { resendVerificationEmail: result } = await backendGraphQLConnector.query({
      query: gql`
        query ResendVerificationEmail {
          resendVerificationEmail
        }
      `,
    });

    return result;
  }

  static async initiateResetPassword(email) {
    const { initiateResetPassword: result } = await backendGraphQLConnector.query({
      variables: { email },
      query: gql`
        query InitiateResetPassword($email: String!) {
          initiateResetPassword(email: $email)
        }
      `,
    });

    return result;
  }

  static async confirmResetPassword(email, verificationToken, newPassword) {
    const { confirmResetPassword: result } = await backendGraphQLConnector.query({
      variables: { email, verificationToken, newPassword },
      query: gql`
        query ConfirmResetPassword($email: String!, $verificationToken: String!, $newPassword: String!) {
          confirmResetPassword(email: $email, verificationToken: $verificationToken, newPassword: $newPassword)
        }
      `,
    });

    return result;
  }

  static async signInWith(provider, code) {
    const { signInWith: user } = await backendGraphQLConnector.mutate({
      variables: { provider, code },
      mutation: gql`
        mutation SignInWith($provider: String!, $code: String!) {
          signInWith(provider: $provider, code: $code) {
            ...UserFragment
          }
        }
        ${UserFragment}
      `,
    });

    return user;
  }
}
