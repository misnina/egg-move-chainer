import React, { Component } from 'react';

import Sprite from './Sprite';

class MoveEntry extends Component {

  render() {
    return (
      <div>
        <Sprite name={this.props.searchName} />
        {this.props.name}
      </div>
    );
  }
}

export default MoveEntry;