import { gql, useQuery } from "@apollo/client";

const GET_BLOGS_BY_PAGE = gql`
  query BlogsByPage($page: Int, $pageSize: Int) {
    blogsByPage(page: $page, pageSize: $pageSize) {
      blogs {
        id
        title
        description
        imgUrl
        category
        timestamp
      }
      currentPage
      totalPages
    }
  }
`;

export const usePaginatedBlogs = (page = 1, pageSize = 6) => {
  const { data, loading, error, refetch } = useQuery(GET_BLOGS_BY_PAGE, {
    variables: { page, pageSize },
  });

  return {
    blogs: data?.blogsByPage.blogs || [],
    isLoading: loading,
    currentPage: data?.blogsByPage.currentPage || 1,
    totalPages: data?.blogsByPage.totalPages || 1,
    refetchPage: (newPage) => refetch({ page: newPage, pageSize }),
    error,
  };
};
