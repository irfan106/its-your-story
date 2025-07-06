import {
  collection,
  getDocs,
  orderBy,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase";

export const useBlogs = ({ latestOnly = false } = {}) => {
  return useQuery({
    queryKey: ["blogs", latestOnly],
    queryFn: async () => {
      const blogsRef = collection(db, "blogs");
      const blogQuery = query(
        blogsRef,
        orderBy("timestamp", "desc"),
        ...(latestOnly ? [limit(5)] : [])
      );

      const snapshot = await getDocs(blogQuery);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
  });
};

export const useTrendingBlogs = () =>
  useQuery({
    queryKey: ["trendingBlogs"],
    queryFn: async () => {
      const trendQuery = query(
        collection(db, "blogs"),
        where("trending", "==", "yes")
      );
      const snapshot = await getDocs(trendQuery);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
  });
