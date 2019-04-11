import gql from 'graphql-tag';

export default gql`
  fragment UserFragment on User {
    id
    name
    email
    phone
    roles
    applications
    avatarUrl
  }
`;
