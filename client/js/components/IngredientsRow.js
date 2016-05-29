import React from 'react';
import ReactDOM from 'react-dom';

export default class IngredientsRow extends React.Component {
  render () {
    return (
      <tr>
        <td>{this.props.ingredient}</td>
        <td>{this.props.count}</td>
      </tr>
    )
  }
}
