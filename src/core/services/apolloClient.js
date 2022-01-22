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

export const loadCurrenciesFN = async () => {
  const { data } = await client.query({
    query: gql`
      query  {
        currencies
      }`
  })
  const { currencies } = data;
  return currencies;
}

export const loadCutegoriesFN = async () => {
  const { data } = await client.query({
    query: gql`
    query {
      categories {
        name
      }
    }`
  })
  const { categories } = data;
  return categories
}

export const loadProductsByCategoryFN = async name => {
  const { data } = await client.query({
    query: gql`
    query {
      category(input: {
        title: "${name}"
      }) {
        products {
          id,
          name,
          inStock,
          gallery,
          brand,
          prices {
            currency,
            amount
          }
        }
      }
    }`
  })
  const { products } = data.category;
  return products
}

export const loadProductByIdFN = async id => {
  const { data } = await client.query({
    query: gql`
    query product {
      product(id: "${id}") {
        id,
        name,
        inStock,
        gallery,
        description,
        category,
        attributes{
          id,
          name,
          items {
            value,
            displayValue
          }
        },
        prices {
          currency
        },
        prices{
          amount
        },
        brand
      }
    }`
  })
  const { product } = data;
  return product
}