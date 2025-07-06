import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";

const PAGE_SIZE = 6;

export const usePaginatedBlogsByPage = () => {
  const [pages, setPages] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastDocs, setLastDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalBlogs, setTotalBlogs] = useState(0);

  const fetchTotalCount = async () => {
    const snapshot = await getCountFromServer(collection(db, "blogs"));
    setTotalBlogs(snapshot.data().count);
  };

  const fetchPage = async (page) => {
    setIsLoading(true);

    let q = query(
      collection(db, "blogs"),
      orderBy("timestamp", "desc"),
      limit(PAGE_SIZE)
    );

    if (page > 1 && lastDocs[page - 2]) {
      q = query(
        collection(db, "blogs"),
        orderBy("timestamp", "desc"),
        startAfter(lastDocs[page - 2]),
        limit(PAGE_SIZE)
      );
    }

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    const updatedPages = [...pages];
    updatedPages[page - 1] = data;
    const updatedLastDocs = [...lastDocs];
    updatedLastDocs[page - 1] = lastVisible;

    setPages(updatedPages);
    setLastDocs(updatedLastDocs);
    setBlogs(data);
    setCurrentPage(page);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTotalCount();
    fetchPage(1);
  }, []);

  const totalPages = Math.ceil(totalBlogs / PAGE_SIZE);

  return {
    blogs,
    isLoading,
    fetchPage,
    currentPage,
    totalPages,
  };
};
