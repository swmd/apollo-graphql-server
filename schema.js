const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
    feed: String
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): User!
    login(email: String!, password: String!): User!
  }

  type AuthPayload {
    status: String!
    result: User!
  }

  type User {
    id: ID!
    email: String!
    name: String!
  }
`;

module.exports = { typeDefs };
