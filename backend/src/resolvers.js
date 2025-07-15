const { db } = require("./firebase");

const resolvers = {
  Query: {
    blogs: async (_, { limit = 10, page = 1, latestOnly = false }) => {
      let query = db.collection("blogs");
      query = query.orderBy("timestamp", "desc");

      if (latestOnly) {
        query = query.limit(limit);
      } else {
        query = query.offset((page - 1) * limit).limit(limit);
      }

      const snapshot = await query.get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate().toISOString(),
      }));
    },

    trendingBlogs: async (_, { limit = 10 }) => {
      try {
        const snapshot = await db
          .collection("blogs")
          .where("trending", "==", "yes")
          .limit(limit)
          .get();

        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate?.().toISOString() || null,
        }));
      } catch (error) {
        console.error("Error in trendingBlogs resolver:", error);
        return [];
      }
    },

    mostPopularBlogs: async (_, { limit = 5 }) => {
      const snapshot = await db
        .collection("blogs")
        .orderBy("views", "desc")
        .limit(limit)
        .get();

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate().toISOString(),
      }));
    },

    blogTags: async () => {
      const snapshot = await db.collection("blogs").get();
      const allTags = snapshot.docs.flatMap((doc) => doc.data().tags || []);
      return [...new Set(allTags)];
    },

    blogsByPage: async (_, { page = 1, pageSize = 6 }) => {
      const offset = (page - 1) * pageSize;

      let queryRef = db
        .collection("blogs")
        .orderBy("timestamp", "desc")
        .offset(offset)
        .limit(pageSize);

      const snapshot = await queryRef.get();

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.().toISOString?.() || null,
      }));

      const countSnap = await db.collection("blogs").count().get();
      const total = countSnap.data().count;

      return {
        blogs: data,
        currentPage: page,
        totalPages: Math.ceil(total / pageSize),
      };
    },
    blog: async (_, { id }) => {
      const docRef = db.collection("blogs").doc(id);
      const doc = await docRef.get();
      if (!doc.exists) return null;

      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toDate?.().toISOString() || null,
      };
    },

    myBlogsByPage: async (_, { page = 1, pageSize = 6 }, { user }) => {
      if (!user) throw new Error("Not authenticated");

      const offset = (page - 1) * pageSize;

      const queryRef = db
        .collection("blogs")
        .where("userId", "==", user.uid)
        .orderBy("timestamp", "desc")
        .offset(offset)
        .limit(pageSize);

      const snapshot = await queryRef.get();

      const blogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.().toISOString?.() || null,
      }));

      // Get total count
      const countSnap = await db
        .collection("blogs")
        .where("userId", "==", user.uid)
        .count()
        .get();

      const total = countSnap.data().count;
      const totalPages = Math.ceil(total / pageSize);

      return {
        blogs,
        currentPage: page,
        totalPages,
      };
    },
  },
};

module.exports = resolvers;
