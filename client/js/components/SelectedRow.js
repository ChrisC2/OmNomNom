import React from 'react';
import ReactDOM from 'react-dom';

export default class SelectedRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.selection}</td>
      </tr>
    )
  }
}
