import { useQuery, gql } from "@apollo/client";

const GET_TAGS = gql`
  query GetTags {
    blogTags
  }
`;

export const useTags = () => {
  const { data, loading, error } = useQuery(GET_TAGS, {});

  return {
    tags: data?.blogTags?.slice(0, 20) || [],
    isLoading: loading,
    error,
  };
};
