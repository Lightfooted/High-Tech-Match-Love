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

export const QUERY_ALL_USERS = gql`
  {
    allUsers {
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

// returns an array of chat messages between the logged in user and the user with the passed in ID
export const QUERY_CHATS_WITH_USER = gql`
    query chatsWithUser($userId:ID!) {
        chatsWithUser(userId: $userId) {
            messageAuthor {
                _id
                firstName
                lastName
            },
            messageRecipient {
                _id
                firstName
                lastName
            },
            chatText,
            createdAt
        }
    }
`;