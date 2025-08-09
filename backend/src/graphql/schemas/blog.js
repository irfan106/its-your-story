const { gql } = require("apollo-server-express");

module.exports = gql`
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

    # Added filters
    blogsByPage(
      page: Int
      pageSize: Int
      category: String
      author: String
      search: String
      sortOrder: String
    ): PaginatedBlogs!

    myBlogsByPage(page: Int, pageSize: Int): PaginatedBlogs!
  }

  type Mutation {
    createBlog(data: BlogInput!): Blog
    updateBlog(id: ID!, data: BlogInput!): Blog
    deleteBlog(id: ID!): Boolean
  }

  input BlogInput {
    title: String!
    description: String!
    imgUrl: String
    author: String
    category: String
    tags: [String]
  }
`;
