const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    location: String
    bio: String
    rightSwipes: [String]
    githubId: String
    profilePicUrl: String
    age: Int
  }

  input Following {
    avatar_url: String
    html_url: String
    login: String
  }

  type Message {
      _id: ID
      author: User
      recipient: User
      text: String
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
    users: [User]
    allUsers: [User]
    allOtherUsers: [User]
    matches(userId: ID): [Match]
    getRightSwipes(userId: ID): User
    usersWithMessages: [User]
    messagesWithUser(userId: ID): [Message]
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
    addRightSwipe(toAdd: Following!): User,
    updateUser( firstName: String, 
                lastName: String,
                location: String, 
                bio: String, 
                githubId: String,
                age: Int,
                profilePicUrl: String): User
    login(email: String!, password: String!): Auth
    addMessage(text: String!, recipient: ID!) : Message
  }
`;

module.exports = typeDefs;
