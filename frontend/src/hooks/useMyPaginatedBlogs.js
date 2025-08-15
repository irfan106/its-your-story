import { useQuery, gql } from "@apollo/client";

export const GET_MY_BLOGS_BY_PAGE = gql`
  query MyBlogsByPage($page: Int, $pageSize: Int) {
    myBlogsByPage(page: $page, pageSize: $pageSize) {
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

export const useMyPaginatedBlogs = (page = 1, pageSize = 6) => {
  const { data, loading, error, refetch } = useQuery(GET_MY_BLOGS_BY_PAGE, {
    variables: { page, pageSize },
  });

  return {
    blogs: data?.myBlogsByPage.blogs || [],
    currentPage: data?.myBlogsByPage.currentPage || 1,
    totalPages: data?.myBlogsByPage.totalPages || 1,
    isLoading: loading,
    error,
    refetchPage: refetch,
  };
};
