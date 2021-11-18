const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    location: String
    bio: String
    rightSwipes: [User]
    leftSwipes: [User]
    githubId: String
    profilePicUrl: String
  }

  type Match {
      requester: User
      requestee: User
      matchState: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    matches(userId: ID): [Match]
    rightSwipes(userId: ID): [User]
    leftSwipes(userId: ID): [User]
  }

  type Mutation {
    addUser(firstName: String!,
            lastName: String!,
            email: String!, 
            password: String!, 
            githubId: String!, 
            location: String, 
            bio: String, 
            profilePicUrl: String): Auth
    addRightSwipe(toAdd: ID!): User,
    addLeftSwipe(toAdd: ID!): User,
    updateUser( firstName: String, 
                lastName: String,
                email: String, 
                password: String, 
                location: String, 
                bio: String, 
                githubId: String, 
                profilePicUrl: String): User
    login(email: String!, password: String!): Auth
  }
`;




module.exports = typeDefs;
