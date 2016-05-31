import React from 'react';
import ReactDOM from 'react-dom';
import FilterBar from './FilterBar';
import RecipeTable from './RecipeTable';
import SelectedTable from './SelectedTable';
import IngredientsTable from './IngredientsTable';
import 'whatwg-fetch';


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      recipes: [],
      selected: localStorage.selected ? JSON.parse(localStorage.selected) : []
    };
  };

  //Adds Checked Props
  previouslyChecked = (recipes, selections) => {
    selections.forEach((selection) => {
      recipes.forEach((recipe) => {
        if(selection.name === recipe.name) {
          recipe.checked = true;
        };
      });
    });
    this.setState({
      recipes: recipes
    });
  };

  //Adds Checked Props if localStorage has Selections
  addCheckedProps = (recipes) => {
    let selections = this.state.selected;
    if(selections.length) {
      this.previouslyChecked(recipes, selections);
    } else {
      this.setState({
        recipes: recipes
      })
    }
  }

  //Retrieves recipes
  componentDidMount = () => {
    fetch('/recipes.json')
      .then((response) => {
        return response.json()
      }).then((json) => {
        return this.addCheckedProps(json);
      }).catch((err) => {
        console.log('parsing failed', err)
      })
  }

  //Triggers Filter
  handleUserInput = (filterText) => {
    this.setState({
      filterText: filterText
    });
  }

  //Adds Recipe Selections
  addSelection = (index) => {
    let selectedRecipe = this.state.recipes[index];
    selectedRecipe.checked = true;
    localStorage.selected = JSON.stringify(this.state.selected.concat(selectedRecipe));
    this.setState({
      selected: this.state.selected.concat(selectedRecipe)
    });
  }

  //Removes Recipe Selection
  removeSelection = (index) => {
    let unselectedRecipe = this.state.recipes[index];
    unselectedRecipe.checked = false;
    if(this.state.selected.length < 2) {
      localStorage.clear();
      this.setState({
        selected: []
      })
    } else {
      let newSelectedState =  this.state.selected.filter((selection) => {
          return selection.name !== unselectedRecipe.name
        });
      localStorage.selected = JSON.stringify(newSelectedState);
      this.setState({
        selected: newSelectedState
      });
    }
  }

  render() {
    // Returns 2D Array of Ingredients
    let mappedIngredients = this.state.selected.map(selected => selected.ingredients);

    //Flattens 2D Array
    let ingredients = mappedIngredients.length ? mappedIngredients.reduce((prev, curr) => prev.concat(curr)) : [];

    return (
      <div>
        <nav className="nav-bar">
          <div className="container-fluid">
            <h1 className="title">Om Nom Nom</h1>
          </div>
        </nav>
        <FilterBar
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput}
        />
        <div className="tables-container">
          <RecipeTable
            recipes={this.state.recipes}
            filterText={this.state.filterText}
            addSelection={this.addSelection}
            removeSelection={this.removeSelection}
            />
          <SelectedTable
            selections={this.state.selected}
          />
          <IngredientsTable
            ingredients={ingredients}
          />
        </div>
      </div>
    )
  }
}
