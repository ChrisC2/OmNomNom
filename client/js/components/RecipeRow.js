import React from 'react';
import ReactDOM from 'react-dom';

export default class RecipeRow extends React.Component {
  constructor(props) {
    super(props);
  }

  //Optimization: Only update when Selection has been toggled
  shouldComponentUpdate(nextProps) {
    return this.props.checked !== nextProps.checked;
  };

  //Toggles Selection
  toggleCheck = () => {
    if(this.props.checked) {
      this.props.unselect(this.props.index);
    } else {
      this.props.select(this.props.index);
    };
  };

  render() {
    let checked = this.props.checked ? true : false;
    return(
      <tr>
        <td>{this.props.rowNumber}</td>
        <td>{this.props.recipe.name}</td>
        <td>{this.props.recipe.type}</td>
        <td>{this.props.recipe.cook_time}</td>
        <td>
          <input type="checkbox"
            defaultChecked={this.props.checked}
            onChange={this.toggleCheck}
          />
        </td>
      </tr>
    )
  }
}
