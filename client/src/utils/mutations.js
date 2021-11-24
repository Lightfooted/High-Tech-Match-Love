import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser(
  $firstName: String!, 
  $lastName: String!,
  $password: String!, 
  $email: String!,
  $githubId: String!) {
    addUser(firstName:$firstName, lastName: $lastName, password: $password, email: $email, githubId: $githubId) {
      token
      user {
        firstName
        lastName
        email
        githubId
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
    mutation updateUser($firstName: String, $lastName: String, $githubId: String, $location: String, $age: Int, $bio: String, $profilePicUrl: String){
      updateUser(firstName: $firstName, lastName: $lastName, githubId: $githubId, location: $location, age: $age, bio: $bio, profilePicUrl: $profilePicUrl){
        firstName
        lastName
        location
        bio
        profilePicUrl
        age
        githubId
      }
    }
`;

export const ADD_RIGHT_SWIPE = gql`
  mutation addRightSwipe($toAdd: inputFollowing!){
    addRightSwipe(toAdd: $toAdd){
      _id
      firstName
      lastName
    }
  }
`
export const ADD_MESSAGE = gql`
    mutation addMessage($text: String!, $recipient: ID!) {
        addMessage(text:$text, recipient: $recipient) {
            _id
            recipient {
                _id
                firstName
                lastName
            }
            author {
                _id
                firstName
                lastName
            }
            text
            createdAt
        }
    }
`;
