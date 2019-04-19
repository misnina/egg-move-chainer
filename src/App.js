import React, { Component } from 'react';
import Search, { searchableName } from './search.js';
import { Route } from 'react-router-dom';
import Pokedex from './pokedex.json';

import Header from './components/Header';
import PKMNEntry from './components/PKMNEntry';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightedPKMN: 'pikachu',
    }
  }

  render() {
    return (
      <div className="app flex column h-center">
        <Header
          searchByPokemon={this.searchByPokemon}
        />
        <Route path="/:pokemon" render={({ match }) => {
          return <PKMNEntry
            key={`${Pokedex[match.params.pokemon].display_name}`}
            searchName={Pokedex[match.params.pokemon].name}
            name={Pokedex[match.params.pokemon].display_name}
            eggGroup1={Pokedex[match.params.pokemon].egg_groups[0]}
            eggGroup2={Pokedex[match.params.pokemon].egg_groups[1]}
            eggMoves={Pokedex[match.params.pokemon].egg_moves}
            learnedMoves={Pokedex[match.params.pokemon].moveset}
            searchEggMoves={Search.forEggMoves}
            searchByPokemon={this.searchByPokemon}
            isEggChain={Search.isEggChain}
          />
        }
        } />
      </div>
    );
  }

  searchByPokemon = (pokemon) => {
    window.scrollTo(0, 0);
    this.props.history.push(`/${searchableName(pokemon)}`);
  }
}

export default App;
