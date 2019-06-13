import React from 'react';
import './App.css';
import logo from './assets/logo.jpg';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import CharacterListContainer from './components/CharacterListContainer';

// apollo client setup
const client = new ApolloClient({
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App bg">
        <img src={logo} alt="Marvel Logo" className="logo" />
        <div className="character-list-container">
          <h1 className="text-white text-pm">Characters</h1>
          <CharacterListContainer/>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
