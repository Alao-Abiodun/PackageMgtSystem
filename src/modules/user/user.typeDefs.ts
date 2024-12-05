import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
    role: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(input: CreateUserInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    updateUser(id: ID!, input: CreateUserInput!): User
    deleteUser(id: ID!): Boolean
  }
`;

export default userTypeDefs;
