import { useQuery, gql } from "@apollo/client";

const GET_TAGS = gql`
  query GetTags {
    blogTags
  }
`;

export const useTags = () => {
  const { data, loading, error } = useQuery(GET_TAGS, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    tags: data?.blogTags || [],
    isLoading: loading,
    error,
  };
};
