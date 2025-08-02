const { mergeTypeDefs } = require("@graphql-tools/merge");
const blogTypeDefs = require("./blog");

module.exports = mergeTypeDefs([blogTypeDefs]);
