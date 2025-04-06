import { gql } from "apollo-server-express";

// Define the GraphQL schema
export const typeDefs = gql`
  # Define the AuthResponse type
  type AuthResponse {
    email: String!
    token: String!
  }

  # Mutation types for signUp and signIn
  type Mutation {
    signUp(email: String!, password: String!): AuthResponse!
    signIn(email: String!, password: String!): AuthResponse!
  }

  # Query types (add other queries as needed)
  type Query {
    hello: String!
  }
`;
