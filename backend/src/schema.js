const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Blog {
    id: ID!
    title: String!
    description: String!
    imgUrl: String
    author: String
    userId: String
    category: String
    tags: [String]
    timestamp: String
    views: Int
  }

  type PaginatedBlogs {
    blogs: [Blog!]!
    currentPage: Int!
    totalPages: Int!
  }

  type Query {
    blogs(limit: Int, page: Int, latestOnly: Boolean): [Blog]
    blog(id: ID!): Blog
    trendingBlogs(limit: Int): [Blog]
    mostPopularBlogs(limit: Int): [Blog]
    blogTags: [String]
    blogsByPage(page: Int, pageSize: Int): PaginatedBlogs!
    myBlogsByPage(page: Int, pageSize: Int): PaginatedBlogs!
  }
`;

module.exports = typeDefs;
