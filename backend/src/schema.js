const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Blog {
    id: ID!
    title: String!
    description: String!
    imgUrl: String
    author: String
    timestamp: String
  }

  type Query {
    blogs(limit: Int, page: Int): [Blog]
  }
`;

module.exports = typeDefs;
