import Pokedex from './pokedex.json';

function getDistinctMoves(pokemon) {
  if (Pokedex[pokemon]) {
    let eggMoves = Pokedex[pokemon].egg_moves ? Pokedex[pokemon].egg_moves : [];
    let learnedMoves = getMoveset(pokemon);
    let allMoves = eggMoves.concat(learnedMoves);
    return [...new Set(allMoves)];
  } else {
    console.log(`Pokemon could not be found: ${pokemon}`);
    return [];
  }
}

function getMoveset(pokemon) {
  let learnedMovesObject = Pokedex[pokemon].moveset;
  let learnedMoves = [];
  for (let level in learnedMovesObject) {
    if (Array.isArray(Pokedex[pokemon].moveset[level])) {
      Pokedex[pokemon].moveset[level].forEach(move => {
        learnedMoves.push(move);
      });
    } else {
      learnedMoves.push(Pokedex[pokemon].moveset[level]);
    }
  }
  return learnedMoves;
}

function sortByID(pokemonArray) {
  return pokemonArray.sort((a, b) => a.id - b.id);
}

export function searchableName(pokemon) {
  return pokemon
    .replace(/\s+/g, '-')
    .replace(/[.,':\s]/g, "")
    .replace(/♀/g, "-f")
    .replace(/♂/g, "-m")
    .toLowerCase();
}


const Search = {

  byEggGroup(eggGroup) {
    let inGroup = [];
    for (let pokemon in Pokedex) {
      if (Pokedex[pokemon].egg_groups[0] === eggGroup || Pokedex[pokemon].egg_groups[1] === eggGroup) {
        inGroup.push(Pokedex[pokemon]);
      }
    }
    return inGroup;
  },

  byMove(move, searchArray = Pokedex) {
    let hasMove = [];
    if (Array.isArray(searchArray)) {
      searchArray.forEach(pokemon => {
        const moves = getDistinctMoves(pokemon.name);
        moves.forEach(moveName => {
          if (moveName.toLowerCase() === move.toLowerCase()) {
            hasMove.push(Pokedex[pokemon.name]);
          }
        });
      })
    } else {
      for (let pokemon in Pokedex) {
        const moves = getDistinctMoves(pokemon);
        moves.forEach(moveName => {
          if (moveName.toLowerCase() === move.toLowerCase()) {
            hasMove.push(Pokedex[pokemon]);
          }
        });
      }
    }
    return hasMove;
  },

  byPokemon(pokemon) {
    for (let pkmn in Pokedex) {
      let name = searchableName(pokemon);
      if (Pokedex[pkmn].name === name) {
        return Pokedex[pkmn];
      }
    }
  },

  byEggAndMove(move = null, eggGroup1, eggGroup2 = null) {
    let byMoves = [];
    if (move) {
      byMoves = Search.byMove(move);
    }
    let byEggGroup = [];
    if (eggGroup2) {
      const byEggGroup1 = Search.byEggGroup(eggGroup1);
      const byEggGroup2 = Search.byEggGroup(eggGroup2);

      byEggGroup = byEggGroup1.filter(pokemon => {
        return byEggGroup2.includes(pokemon);
      });
    } else {
      byEggGroup = Search.byEggGroup(eggGroup1);
    }

    if (!move) {
      return byEggGroup;
    } else {
      return byEggGroup.filter(pokemon => {
        return byMoves.includes(pokemon);
      });
    }
  },

  forEggMoves(pokemon, move) {
    const relatedPokemonGroup1 = Search.byEggAndMove(move, Pokedex[pokemon].egg_groups[0]);

    if (Pokedex[pokemon].egg_groups[1]) {
      const relatedPokemonGroup2 = Search.byEggAndMove(move, Pokedex[pokemon].egg_groups[1]);

      let combine = relatedPokemonGroup1.concat(relatedPokemonGroup2);
      return sortByID([...new Set(combine)]);

    } else if (Pokedex[pokemon].egg_groups[0] === "Undiscovered") {
      if (Pokedex[pokemon].evolutions) {
        let name = searchableName(Pokedex[pokemon].evolutions[0][0]);
        return Search.forEggMoves(name, move);
      } else {
        return [];
      }
    } else {
      return sortByID(relatedPokemonGroup1);
    }
  },
}

export default Search;