import gql from 'graphql-tag';

const getCharactersQuery = gql `
  query getCharacters($offset: Int) {
    characters(offset: $offset) {
      id
      name
      description
      thumbnail {
        path
        extension
      }
    }
  }
`;

export { getCharactersQuery };