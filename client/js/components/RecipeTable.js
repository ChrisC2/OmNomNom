import React from 'react';
import ReactDOM from 'react-dom';
import RecipeRow from './RecipeRow';

export default class RecipeTable extends React.Component {
  constructor(props) {
    super(props);
  };
  render () {

    //Filters Table based on FilterText input
    let rows = [];
    let rowCount = 1;
    this.props.recipes.forEach((recipe,index) => {
      let lastRecipe = null;
      recipe.ingredients.forEach((ingredient) => {
        let toLowerCase = ingredient.toLowerCase();
        let filtertoLowerCase = this.props.filterText.toLowerCase();
        if(toLowerCase.indexOf(filtertoLowerCase) > -1 && lastRecipe !== recipe) {
          rows.push(<RecipeRow
                      key={index}
                      index={index}
                      recipe={recipe}
                      rowNumber={rowCount++}
                      checked={recipe.checked}
                      select={this.props.addSelection}
                      unselect={this.props.removeSelection}
                    />);
          lastRecipe = recipe;
        };
      });
    });

    return(
      <div className='table-container'>
      <h2>Recipes</h2>
      <div className='grid-container'>
        <table className='table table-striped table-hover table-responsive'>
        <tbody>
        <tr>
          <th>#</th>
          <th>Dish</th>
          <th>Category</th>
          <th>Cook Time(min)</th>
          <th>Selected</th>
        </tr>
        {rows}
        </tbody>
        </table>
        </div>
      </div>
    )
  }
}
