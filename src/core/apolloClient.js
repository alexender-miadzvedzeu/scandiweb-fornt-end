import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

export const getCutegories = async () => {
  const { data } = await client.query({
    query: gql`
    query categories {
      categories {
        name
      }
    }`
  })
  const { categories } = data;
  return categories
} 