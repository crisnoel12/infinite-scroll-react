import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CharacterListItem from './CharacterListItem';

class CharactersList extends Component {
  render() {
    return (
      <InfiniteScroll
        dataLength={this.props.characters.length}
        next={this.props.onLoadMore}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {this.props.characters.map((character) => (
          <CharacterListItem key={character.id} character={character} />
        ))}
      </InfiniteScroll>
    );
  }
}

export default CharactersList;
