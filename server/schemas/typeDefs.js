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
    age: Int
  }

  type OneToOneChat {
      messageAuthor: User
      messageRecipient: User
      chatText: String
      createdAt: String
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
    allUsers: [User]
    matches(userId: ID): [Match]
    rightSwipes(userId: ID): [User]
    leftSwipes(userId: ID): [User]
    usersWithChats: [User]
    chatsWithUser(userId: ID): [OneToOneChat]
  }

  type Mutation {
    addUser(firstName: String!,
            lastName: String!,
            email: String!, 
            password: String!, 
            githubId: String!, 
            location: String, 
            bio: String,
            age: Int,
            profilePicUrl: String): Auth
    addRightSwipe(toAdd: ID!): User,
    addLeftSwipe(toAdd: ID!): User,
    updateUser( firstName: String, 
                lastName: String,
                location: String, 
                bio: String, 
                githubId: String,
                age: Int,
                profilePicUrl: String): User
    login(email: String!, password: String!): Auth
  }
`;




module.exports = typeDefs;
