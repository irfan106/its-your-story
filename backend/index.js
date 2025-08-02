const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
require("dotenv").config();

const typeDefs = require("./src/graphql/schemas");
const resolvers = require("./src/graphql/resolvers");
const { auth } = require("./src/firebase");

async function startServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.headers.authorization?.split("Bearer ")[1];
      if (!token) return { user: null };
      try {
        const decodedToken = await auth.verifyIdToken(token);
        return { user: decodedToken };
      } catch (error) {
        console.error("Auth error:", error);
        return { user: null };
      }
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
