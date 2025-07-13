const { db } = require("./firebase");

const resolvers = {
  Query: {
    blogs: async (_, { limit = 5, page = 1 }) => {
      const snapshot = await db
        .collection("blogs")
        .orderBy("timestamp", "desc")
        .offset((page - 1) * limit)
        .limit(limit)
        .get();

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate().toISOString(),
      }));
    },
  },
};

module.exports = resolvers;
