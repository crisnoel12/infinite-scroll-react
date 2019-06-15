import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CharacterListItem from './CharacterListItem';

const CharactersList = (props) => {
  return (
    <InfiniteScroll
      dataLength={props.characters.length}
      next={props.onLoadMore}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {props.characters.map((character) => (
        <CharacterListItem key={character.id} character={character} />
      ))}
    </InfiniteScroll>
  )
}

export default CharactersList;

