import { useQuery, gql } from "@apollo/client";

const GET_POPULAR = gql`
  query GetPopular($limit: Int) {
    mostPopularBlogs(limit: $limit) {
      id
      title
      imgUrl
      views
      timestamp
    }
  }
`;

export const usePopularBlogs = (limit = 5) => {
  const { data, loading, error } = useQuery(GET_POPULAR, {
    variables: { limit },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    data: data?.mostPopularBlogs || [],
    isLoading: loading,
    error,
  };
};
