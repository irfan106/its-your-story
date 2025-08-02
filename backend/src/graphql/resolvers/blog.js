const { db } = require("../../firebase");

const blogResolvers = {
  Query: {
    blogs: async (_, { limit = 10, page = 1, latestOnly = false }) => {
      let query = db.collection("blogs").orderBy("timestamp", "desc");
      if (latestOnly) query = query.limit(limit);
      else query = query.offset((page - 1) * limit).limit(limit);

      const snapshot = await query.get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate().toISOString(),
      }));
    },

    blog: async (_, { id }) => {
      const doc = await db.collection("blogs").doc(id).get();
      if (!doc.exists) return null;
      return {
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()?.toISOString() || null,
      };
    },

    trendingBlogs: async (_, { limit = 10 }) => {
      const snapshot = await db
        .collection("blogs")
        .orderBy("views", "desc")
        .limit(limit)
        .get();

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()?.toISOString() || null,
      }));
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
      const snapshot = await db
        .collection("blogs")
        .orderBy("timestamp", "desc")
        .offset(offset)
        .limit(pageSize)
        .get();

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

      const countSnap = await db
        .collection("blogs")
        .where("userId", "==", user.uid)
        .count()
        .get();

      const total = countSnap.data().count;

      return {
        blogs,
        currentPage: page,
        totalPages: Math.ceil(total / pageSize),
      };
    },
  },

  Mutation: {
    createBlog: async (_, { data }, { user }) => {
      if (!user) throw new Error("Not authenticated");

      const blogRef = db.collection("blogs").doc();
      const newBlog = {
        ...data,
        userId: user.uid,
        timestamp: new Date(),
        views: 0,
      };

      await blogRef.set(newBlog);
      return {
        id: blogRef.id,
        ...newBlog,
        timestamp: newBlog.timestamp.toISOString(),
      };
    },

    updateBlog: async (_, { id, data }, { user }) => {
      const docRef = db.collection("blogs").doc(id);
      const doc = await docRef.get();

      if (!doc.exists) throw new Error("Blog not found");
      if (doc.data().userId !== user.uid) throw new Error("Unauthorized");

      await docRef.update(data);
      const updatedDoc = await docRef.get();

      return {
        id: updatedDoc.id,
        ...updatedDoc.data(),
        timestamp: updatedDoc.data().timestamp.toDate().toISOString(),
      };
    },

    deleteBlog: async (_, { id }, { user }) => {
      const docRef = db.collection("blogs").doc(id);
      const doc = await docRef.get();

      if (!doc.exists) throw new Error("Blog not found");
      if (doc.data().userId !== user.uid) throw new Error("Unauthorized");

      await docRef.delete();
      return true;
    },
  },
};

module.exports = blogResolvers;
