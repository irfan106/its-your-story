const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
require("dotenv").config();

const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");
const { auth } = require("./src/firebase"); // Import Firebase Auth

async function startServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.headers.authorization?.split("Bearer ")[1];
      console.log("Received token:", token); // ✅ Should now log token

      if (!token) return { user: null };

      try {
        const decodedToken = await auth.verifyIdToken(token);
        console.log("Decoded user:", decodedToken); // ✅ Log user
        return { user: decodedToken };
      } catch (error) {
        console.error("Error verifying token:", error);
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
