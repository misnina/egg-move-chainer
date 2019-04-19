import React from 'react';

import PKMNSelect from './PKMNSelect';

export default function Header(props) {
  return (
    <header className="h-center">
      <PKMNSelect
        searchByPokemon={props.searchByPokemon}
      />
    </header>
  );
}