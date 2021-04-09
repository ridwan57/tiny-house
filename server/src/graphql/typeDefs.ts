import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    listings: [Listing!]!
  }

  type Listing {
    id: ID!
    title: String!
    image: String!
    address: String!
    price: Int!
    numOfGuests: Int!
    numOfBeds: Int!
    numOfBaths: Int!
    rating: Float!
  }

  type Mutation {
    deleteListing(id: ID!): Listing!
  }
`;
