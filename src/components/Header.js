import React from 'react';

import PKMNSelect from './PKMNSelect';
import Sprite from './Sprite';

export default function Header(props) {
  return (
    <header className="h-center">
      <PKMNSelect
        searchByPokemon={props.searchByPokemon}
      />
      <div className="use-text">
        Use the selector above to choose a pokemon to look at the moves learned and egg move information. If an evolution, please look to the lowest evolution for egg moves. (Exceptions being pokemon like Marill who have different egg moves to it's baby form Azurill)
          <div className="flex h-center">
          <div className="circle">
            <Sprite
              name="marill"
            />
          </div>
          If the pokemon has a red background, that means the pokemon can only pass down the egg move from learning that move as an egg move itself, aka, is part of a breeding chain.
           </div>
        If a move only contains the pokemon listed, it means that it can only learn the move from the same pokemon who learned it in a previous generation. This data uses Sun and Moon.
        Hover over a pokemon to get it's searchable name that you may put into the url, or press the pokemon to go to their page.
        </div>
    </header>
  );
}