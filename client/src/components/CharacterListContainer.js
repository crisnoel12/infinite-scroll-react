import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getCharactersQuery } from '../queries/charactersQueries'; 
import CharacterList from './CharactersList';

class CharacterListContainer extends Component {
  state = {
    offset: 0 // offset num to pass when querying for characters
  }
  render() {
    return (
      <Query query={getCharactersQuery} variables={{offset: this.state.offset}}>
        {({ loading, error, data, fetchMore }) => {
          if(loading) return <h4>Loading...</h4>;
          if(error) console.log(error);
          return (
            <CharacterList 
              characters={data.characters} 
              entries={data.characters || []}
              onLoadMore={() =>
                fetchMore({
                  variables: {
                    offset: data.characters.length
                  },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    characters: [...prev.characters, ...fetchMoreResult.characters]
                  });
                }})
              }
            />
          )
        }}
      </Query>
    );
  }
}

export default CharacterListContainer;