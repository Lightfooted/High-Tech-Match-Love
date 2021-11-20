import { gql } from '@apollo/client';


export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      email
      githubId
      location
      bio
      profilePicUrl
      age
      rightSwipes { _id }
      leftSwipes { _id }
    }
  }
`;

export const QUERY_GITHUB_USER = gql`
  {
      ghUser {
        firstName
        lastName
        email
        githubId
        location
        bio
        profilePicUrl
        rightSwipes { _id }
        leftSwipes { _id }
      }
  }
`;
