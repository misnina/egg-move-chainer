import React, { Component } from 'react';

import Sprite from './Sprite';

class PKMNEntry extends Component {

  render() {
    return (
      <section className="entry">
        <div>
          <Sprite name={this.props.searchName} />
          {this.props.name}
          <div className="group">
            {this.props.eggGroup1}
            {this.props.eggGroup2
              ? ` | ${this.props.eggGroup2}`
              : null}
          </div>
        </div>
        <div className="move-list">
          <div>
            <h4>Learned Moves</h4>
            {this.displayLearnedMoves(this.props.learnedMoves)}
          </div>
        </div>
        <div>
          <h4>Egg Moves</h4>
          {this.props.eggMoves
            ? this.displayEggMoves(this.props.eggMoves)
            : 'See lower evolution for egg moves.'}
        </div>
      </section>
    );
  }

  displayLearnedMoves(moveList) {
    const { learnedMoves } = this.props;
    let moves = [];
    for (let level in moveList) {
      if (Array.isArray(learnedMoves[level])) {
        learnedMoves[level].forEach(move => {
          moves.push(
            <div key={`${level}-${move}`}>
              {`[${level}]: `}
              {move}
            </div>
          );
        })
      } else {
        moves.push(
          <div key={`${level}-${learnedMoves[level]}`}>
            {`[${level}]: `}
            {learnedMoves[level]}
          </div>
        )
      }
    }
    return moves;
  }

  displayEggMoves(moveList) {
    let moves = [];
    moveList.forEach(move => {
      let pkmnWithChain = this.props.searchEggMoves(this.props.searchName, move);
      let sprites = pkmnWithChain.map(pokemon => {
        return (
          <button
            className={`${this.props.isEggChain(move, pokemon.name) ? 'chain' : 'normal'}`}
            onClick={() => this.props.searchByPokemon(pokemon.name)}
            key={`icon-${pokemon.name}-${move}`}
          >
            <Sprite
              name={pokemon.name}
            />
          </button>
        )
      })
      moves.push(
        <div
          className="flex egg-moves"
          key={`${this.props.name}-${move}`}
        >
          <div className="move-name">
            {move}:
          </div>
          <div className="wrap sprite-list">
            {sprites}
          </div>
        </div>
      )
    });
    return moves;
  }

}

export default PKMNEntry;