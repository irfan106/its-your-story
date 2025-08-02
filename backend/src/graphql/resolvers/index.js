const blogResolvers = require("./blog");

module.exports = {
  Query: {
    ...blogResolvers.Query,
  },
  Mutation: {
    ...blogResolvers.Mutation,
  },
};
