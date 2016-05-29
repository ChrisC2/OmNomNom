import React from 'react';
import ReactDOM from 'react-dom';
import IngredientsRow from './IngredientsRow';

export default class IngredientsTable extends React.Component {
  render() {
    //Sorts list of ingredients
    let sorted = this.props.ingredients.sort();

    //Counts & Maps ingredients to storage Object
    let ingredientCount = {};
    sorted.forEach((ingredient) => {
      ingredientCount[ingredient] = ingredientCount[ingredient] + 1 || 1;
    });

    //Removes Duplicate Ingredients
    let removeDups = sorted.filter((ingredient, index) =>
      sorted.indexOf(ingredient) === index);

    //Maps IngredientsRow Components to Render
    let ingredients = removeDups.map((ingredient, index) =>
      <IngredientsRow key={index} ingredient={ingredient} count={ingredientCount[ingredient]}/>);

    return(
      <div className='table-container'>
        <h2>Shopping List</h2>
        <div className='grid-container'>
          <table className='table table-striped table-hover table-responsive'>
          <tbody>
          <tr>
            <th>Ingredient</th>
            <th>Count</th>
          </tr>
          {ingredients}
          </tbody>
          </table>
        </div>
      </div>
    )
  }
}
