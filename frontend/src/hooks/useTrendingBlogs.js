import { useQuery, gql } from "@apollo/client";

const GET_TRENDING = gql`
  query GetTrending($limit: Int) {
    trendingBlogs(limit: $limit) {
      id
      title
      imgUrl
      author
      timestamp
    }
  }
`;

export const useTrendingBlogs = (limit = 10) => {
  const { data, loading, error } = useQuery(GET_TRENDING, {
    variables: { limit },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    data: data?.trendingBlogs || [],
    isLoading: loading,
    error,
  };
};
