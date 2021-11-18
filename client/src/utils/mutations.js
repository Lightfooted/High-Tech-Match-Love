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

export const ADD_PROFILE_PIC = gql`
    mutation addProfilePic($picPath: String!) {
        addProfilePic(picPath:$picPath) {
            user {
                profilePicUrl
            }    
        }        
    }
`;
