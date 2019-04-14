import React from 'react';
import Pokedex from '../pokedex.json';

export default function PKMNSelect(props) {
  let options = [];
  for (let pokemon in Pokedex) {
    options.push(<option
      value={Pokedex[pokemon].display_name}
      key={pokemon}
      onClick={e => props.searchByPokemon(e.target.value)}
    >
      {Pokedex[pokemon].display_name}
    </option>)
  }
  return (
    <div>
      <select>
        {options}
      </select>
    </div>
  );
}