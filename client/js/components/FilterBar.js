import React from 'react';
import ReactDOM from 'react-dom';

export default class FilterBar extends React.Component {
  handleChange = (event) => {
    this.props.onUserInput(this.refs.filterTextInput.value);
  };

  render() {
    return(
      <div className="search-container">
        <form className="search input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Filter Recipes by Ingredient..."
            ref="filterTextInput"
            onChange={this.handleChange}
          />
            <span className="input-group-btn">
              <button className="btn btn-info search-btn">
                <i className="glyphicon glyphicon-search" onClick={this.handleChange}></i>
              </button>
            </span>
        </form>
      </div>
    )
  }
}
