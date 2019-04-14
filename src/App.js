import React, { Component } from 'react';
import Search from './search.js';

import Header from './components/Header';
import PKMNEntry from './components/PKMNEntry';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      eggChain: [],
    }
  }

  render() {
    const { query } = this.state;
    let pokemon = null;
    if (query) {
      let eggGroup1;
      let eggGroup2;
      if (query.egg_groups) {
        eggGroup1 = query.egg_groups[0];
        if (query.egg_groups[1]) {
          eggGroup2 = query.egg_groups[1]
        }
      }

      pokemon =
        <PKMNEntry
          key={`${query.display_name}`}
          searchName={query.name}
          name={query.display_name}
          eggGroup1={eggGroup1}
          eggGroup2={eggGroup2}
          eggMoves={query.egg_moves}
          learnedMoves={query.moveset}
          searchEggChain={Search.forEggChain}
          searchByPokemon={this.searchByPokemon}
        />;
    }

    return (
      <div className="app flex column h-center">
        <Header
          searchByPokemon={this.searchByPokemon}
        />
        {query ? pokemon : "Select a pokemon from the drop down"}
      </div>
    );
  }

  searchByPokemon = (pokemon) => {
    window.scrollTo(0, 0);
    console.log(pokemon);
    this.setState({ query: Search.byPokemon(pokemon) });
  }
}

export default App;
