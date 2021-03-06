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
      rightSwipes{
        avatar_url
        html_url
        login
      }
    }
  }
`;

export const QUERY_ALL_USERS = gql`
  {
    allUsers {
      _id
      firstName
      lastName
      email
      githubId
      location
      bio
      profilePicUrl
      age
      rightSwipes
      
    }
  }
`;

export const QUERY_ALL_OTHER_USERS = gql`
  {
    allOtherUsers {
      _id
      firstName
      lastName
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
        rightSwipes
        
      }
  }
`;

// returns an array of messages between the logged in user and the user with the passed in ID
export const QUERY_MESSAGES_WITH_USER = gql`
    query messagesWithUser($userId:ID!) {
        messagesWithUser(userId: $userId) {
            _id
            author {
                _id
                firstName
                lastName
            },
            recipient {
                _id
                firstName
                lastName
            },
            text,
            createdAt
            }
        }
`;