import React from 'react';
import ReactDOM from 'react-dom';
import SelectedRow from './SelectedRow';

export default class SelectedTable extends React.Component {
  constructor(props) {
    super(props);
  };
  render() {

    let rows = this.props.selections.map((selection, index) => {
      return <SelectedRow key={index} selection={selection.name}/>
    });

    return(
      <div className='table-container'>
        <h3>My Selections</h3>
        <div className='grid-container'>
          <table className='table table-striped table-hover table-responsive'>
          <tbody>
          <tr>
            <th>Dish</th>
          </tr>
          {rows}
          </tbody>
          </table>
        </div>
      </div>
    )
  }
}
