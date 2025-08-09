import { gql, useLazyQuery } from "@apollo/client";

export const GET_BLOGS_BY_PAGE = gql`
  query BlogsByPage(
    $page: Int
    $pageSize: Int
    $category: String
    $author: String
    $search: String
    $sortOrder: String
  ) {
    blogsByPage(
      page: $page
      pageSize: $pageSize
      category: $category
      author: $author
      search: $search
      sortOrder: $sortOrder
    ) {
      blogs {
        id
        title
        description
        imgUrl
        category
        timestamp
        author
      }
      currentPage
      totalPages
    }
  }
`;

export const usePaginatedBlogs = () => {
  const [fetchBlogs, { data, loading, error }] =
    useLazyQuery(GET_BLOGS_BY_PAGE);

  return {
    blogs: data?.blogsByPage?.blogs || [],
    isLoading: loading,
    currentPage: data?.blogsByPage?.currentPage || 1,
    totalPages: data?.blogsByPage?.totalPages || 1,
    fetchBlogs, // caller will pass variables when calling
    error,
  };
};
