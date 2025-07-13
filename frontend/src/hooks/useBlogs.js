import { useQuery, gql } from "@apollo/client";

const GET_BLOGS = gql`
  query GetBlogs($limit: Int, $page: Int, $latestOnly: Boolean) {
    blogs(limit: $limit, page: $page, latestOnly: $latestOnly) {
      id
      title
      description
      imgUrl
      category
      tags
      author
      userId
      timestamp
    }
  }
`;

export const useBlogs = ({ latestOnly = false, limit = 6, page = 1 } = {}) => {
  const { data, loading, error } = useQuery(GET_BLOGS, {
    variables: { latestOnly, limit, page },
  });

  return {
    data: data?.blogs || [],
    isLoading: loading,
    error,
  };
};
