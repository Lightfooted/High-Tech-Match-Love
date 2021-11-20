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
`;

export const UPDATE_USER = gql`
    mutation updateUser($firstName: String, $lastName: String, $location: String, $bio: String, $githubId: String, $age: Int, $profilePicUrl: String) {
        updateUser(firstName: $firstName, lastName: $lastName, location: $location, bio: $bio, githubId: $githubId, age: $age, profilePicUrl: $profilePicUrl) {
            firstName
            lastName
            email
            githubId
            location
            bio
            age
            rightSwipes {
                _id
                firstName
                lastName
            }
            leftSwipes {
                _id
                firstName
                lastName
            }
            profilePicUrl
            _id
        }
    }
`;

export const ADD_RIGHT_SWIPE = gql`
  mutation addRightSwipe($toAdd: ID!){
    addRightSwipe(toAdd: $toAdd){
      _id
      firstName
      lastName
    }
  }
`
