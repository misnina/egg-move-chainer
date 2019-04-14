import React from 'react';

import PKMNSelect from './PKMNSelect';

export default function Header(props) {
  return (
    <header>
      <PKMNSelect
        searchByPokemon={props.searchByPokemon}
      />
    </header>
  );
}