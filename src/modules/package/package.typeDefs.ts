import { gql } from "apollo-server-express";

const packageTypeDefs = gql`
  type Package {
    id: ID!
    name: String!
    description: String!
    price: Float!
    expirationDate: String!
  }

  input CreatePackageInput {
    name: String!
    description: String!
    price: Float!
    expirationDate: String!
  }

  type Query {
    getPackage(id: ID!): Package
    getPackages(expirationDate: String): [Package]
  }

  type Mutation {
    createPackage(input: CreatePackageInput!): Package!
    updatePackage(id: ID!, input: CreatePackageInput!): Package!
    deletePackage(id: ID!): Boolean
  }
`;

export default packageTypeDefs;
