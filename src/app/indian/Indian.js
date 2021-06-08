import './Indian.css';
import '../../index.css';
import '../landing-page/LandingPage.css';
import '../../external/font-awesome/font-awesome.min.css'
import hydrabadhiJson from './recipes/hydrabadhi.json'
import Slider from '../slider/Slider'
import React from 'react';

/**
 * class to define the page for Indian recipes
 */
class Indian extends React.Component {



    //constructor for this class
    constructor(props) {
        super(props);

        this.fractionPattern = /(?:[1-9][0-9]*|0)(?:\/[1-9][0-9]*)?/g;

        this.title = "Indian Cuisine";

        let hydrabadhi = hydrabadhiJson;
        let tikkaBalti = { "name": "Tikka Balti - Coming Soon!", "disabled": true };
        let saag = { "name": "Saag Gosht - Coming Soon!", "disabled": true  };

        this.recipes = [hydrabadhi, saag, tikkaBalti];
        this.numPages = 4;

        this.maxServingSize = 10;

        this.nextPageButton = <div className="i-page-button-container i-next-page-button"><button className="fa fa-arrow-down" onClick={() => this.nextPage()}></button></div>;
        this.prevPageButton = <div className="i-page-button-container i-prev-page-button"><button className="fa fa-arrow-up"  onClick={() => this.prevPage()}></button></div>;

        this.innerPage1 = {
            "title": "Choose a Recipe",
            "contentsType": "recipeSelector"
        }

        this.innerPage2 = {
            "title": "Options",
            "contentsType": "tools"
        }

        this.innerPage3 = {
            "title": "Ingredients",
            "contentsType": "ingredients"
        }

        this.innerPage4 = {
            "title": "Cook!",
            "contentsType": "method"
        }

        //put inner page on state so that it re renders the screen if this changes
        this.state = {
            innerPage: 1, selectedRecipe: { "name": "" }, "options": { dairyFree: false, glutenFree: false, vegetarian: false, vegan: false },
            creaminess: 50, heat: 33.33, servingSize: 2
        };

        // This binding is necessary to make `this` work in the callback
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.setInnerPage = this.setInnerPage.bind(this);
        this.getActiveInnerPage = this.getActiveInnerPage.bind(this);
        this.buildInnerPageContainer = this.buildInnerPageContainer.bind(this);
        this.recipeSelected = this.recipeSelected.bind(this);
        this.sliderChanged = this.sliderChanged.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.toggleSelect = this.toggleSelect.bind(this);
        this.decimalToFraction = this.decimalToFraction.bind(this);
    }

    //callback function called when user wants to move to next inner page
    nextPage() {
        let newPage = this.state.innerPage + 1;
        this.setInnerPage(newPage);
    }

    //callback function called when user wants to move to previous inner page
    prevPage() {
        let newPage = this.state.innerPage - 1;
        this.setInnerPage(newPage);
    }

    //Function to set the inner page to a specific value
    setInnerPage(newPage) {
        this.setState(state => ({
            innerPage: newPage
        }));
    }

    //Function called from the jsx to retrieve the active page
    getActiveInnerPage() {
        let activeInnerPage = this.innerPage1;
        switch (this.state.innerPage) {
            case 1:
                activeInnerPage = this.innerPage1;
                break;
            case 2:
                activeInnerPage = this.innerPage2;
                break;
            case 3:
                activeInnerPage = this.innerPage3;
                break;
            case 4:
                activeInnerPage = this.innerPage4;
                break;
            default:
                break;
        }
        return activeInnerPage;
    }

    //Funciton to build the container for the inner page
    buildInnerPageContainer(innerPage) {

        let pageTitle = innerPage.title;
        let pageContentsType = innerPage.contentsType;
        if (pageContentsType !== "recipeSelector" && pageContentsType !== "method") {
            pageTitle = this.state.selectedRecipe.name + " " + pageTitle;
        }


        let pageContents = <div></div>;

        switch (pageContentsType) {
            case "recipeSelector":
                pageContents = this.buildRecipeSelector(pageContents);
                break;
            case "tools":
                pageContents = this.buildRecipeTools(pageContents);
                break;
            case "ingredients":
                pageContents = this.buildIngredientsEditor(pageContents);
                break;
            case "method":
                pageContents = this.buildMethod(pageContents);
                break;
            default:
                break;
        }

        let nextPageButton = (this.state.innerPage > this.numPages-1) ? <div></div> : this.nextPageButton;
        let prevPageButton = (this.state.innerPage < 2) ? <div></div> : this.prevPageButton;

        let innerPageContainer = <div className="i-inner-page-container">
            <div className="i-inner-page-title-and-body-container">
                <div className="i-inner-page-title-container">
                    <span className="i-inner-page-title">{pageTitle}</span>
                </div>
                <div className="i-inner-page-body-container">
                    <div className="i-inner-page-body">{pageContents}</div>
                </div>
                {prevPageButton}
                {nextPageButton}
            </div>
        </div>;

        return innerPageContainer;
    }

    //Funciton to build the inner page for recipe selection
    buildRecipeSelector(pageContents) {
        let list = [];
        let that = this;
        this.recipes.forEach(function (recipe) {
            let isRecipeSelected = (that.state.selectedRecipe.name === recipe.name);
            if (!recipe.disabled) {
                let li = <li key={recipe.name} className={isRecipeSelected ? "i-recipe-option i-recipe-option-enabled i-recipe-selected" : "i-recipe-option-enabled i-recipe-option"} onClick={() => that.recipeSelected(recipe)}>{recipe.name}</li>
                list.push(li);
            }
            else {
                let li = <li key={recipe.name} className= "i-recipe-option" >{recipe.name}</li>
                list.push(li);
            }
        })

        pageContents = <div className="i-recipe-selector">
            <ul className="i-recipe-options">
                {list}
            </ul>
        </div>;

        return pageContents;
    }

    //Funciton to select a recipe when clicked on
    recipeSelected(selection) {
        if (this.state.selectedRecipe.name === selection.name) {
            selection = { "name": "" };
        }
        this.setState(state => ({
            selectedRecipe: selection
        }));

        if (selection.name !== "") {
            this.nextPage();
        }
    }

    //Funciton to build the inner page for Tools to edit recipe
    buildRecipeTools(pageContents) {

        //tool for serving size
        let servingSizeOptions = [];
        for (let i = 0; i < this.maxServingSize; i++) {
            servingSizeOptions.push(<option value={i+1} key={i+1}>{i + 1}</option>);
        }

        let numPeopleTool = <div><span>Servings: </span><select value={this.state.servingSize} onChange={e => this.toggleSelect(e,"servingSize")}>
            {servingSizeOptions}
        </select></div>

        //tool for heat
        let heatTool = <Slider sliderName="heat" sliderDisplayTag="Heat:" sliderChanged={this.sliderChanged} defaultValue={ this.state.heat}/>;

        //checkboxes
        let dairyFree = this.buildCheckbox(this.state.options.dairyFree, "dairyFree", "Dairy Free: ");
        let vegetarian = this.buildCheckbox(this.state.options.vegetarian, "vegetarian", "Vegetarian:  ");
        let glutenFree = this.buildCheckbox(this.state.options.glutenFree, "glutenFree", "Gluten Free: ");
        let vegan = this.buildCheckbox(this.state.options.vegan, "vegan", "Vegan:  ");

        let checkboxes = <div className="i-check-box-container">
            {vegetarian}
            {dairyFree}
            {glutenFree}
            {vegan}
        </div>;

        //tool for dry vs creamy
        let creaminessTool = <Slider sliderName="creaminess" sliderDisplayTag="Creaminess:" sliderChanged={this.sliderChanged} defaultValue={this.state.creaminess}/>;

            
        pageContents = <div className="i-recipe-selector">
            <div className="i-tools-container">
                {numPeopleTool}
                {heatTool}
                {creaminessTool}
                {checkboxes}
            </div>
        </div>;

        return pageContents;
    }

    /**
     * Function to build a checkbox as JSX
     * @param val the value of the checkbox, true or false
     * @param id the id of the checkbox 
     * @param tag the tag to display next to the checkbox
    */
    buildCheckbox(val, id, tag) {
        let checkBox = <div>
            <label>
                <span>{tag} </span>
            </label>
            <input name={id} id={id} type="checkbox" checked={val} onChange={this.toggleCheckbox} />
        </div>;

        return checkBox;
    }

    //Function called when a checkbox has been toggled on the page
    toggleCheckbox(event) {
        const name = event.target.name;
        const val = event.target.checked;
        var options = { ...this.state.options }
        options[name] = val;
        this.setState({ options });
    }

    //Function called when select drop down is toggled
    toggleSelect(event, name) {
        const val = event.target.value;
        this.setState(state => ({
            [name]: val
        }));
    }

    //Function called when a slider declared on this page changes value
    sliderChanged(sliderValue, sliderName) {
        this.setState(state => ({
            [sliderName]: Number(sliderValue)
        }));
    }

    //Function to build the inner page to allow user to alter the ingredients
    buildIngredientsEditor(pageContents) {

        //make this accessible in loops etc
        let that = this;

        let ingredientsArray = []

        //get recipe object for selected recipe
        const selectedRecipe = this.state.selectedRecipe;
        if (selectedRecipe.name !== "") {

            //determine which checkboxes were selected
            let enabledOptions = [];
            for (let opt in this.state.options) {
                if (this.state.options[opt] === true) {
                    enabledOptions.push(opt);
                }
            }

            let heatVal = (this.state.heat / 100) * 3;
            let creamVal = (this.state.creaminess / 100) * 2;
            let servingVal = this.state.servingSize / 2;

            //build ingredients list
            selectedRecipe.ingredients.forEach(function (ingredient) {
                let ingredientToAdd = Object.assign({}, ingredient);

                //apply checkbox filters
                enabledOptions.forEach(function (opt) {
                    if (ingredient[opt] !== undefined) {
                        let newIngredient = {};
                        newIngredient.name = ingredient[opt];
                        newIngredient.amount = "" + ingredient[opt + "Amount"];
                        newIngredient.id = ingredient.id;
                        ingredientToAdd = newIngredient;
                    }
                })
                let numericAmountFraction = ingredientToAdd.amount.match(that.fractionPattern);
                let units = ingredientToAdd.amount.replace(/[^a-z]/gi, '');
                let numericAmount = Number(eval(numericAmountFraction[0]));

                //apply heat slider
                if (ingredientToAdd.id === "chillies" || ingredientToAdd.id === "pepper"
                    || ingredientToAdd.id === "chilliePowder") {
                    numericAmount = (Math.round(numericAmount * heatVal * 4) / 4);
                }

                if ((ingredientToAdd.id === "ginger" || ingredientToAdd.id === "coriander")
                    && heatVal > 1) { //too much ginger/coriander gives weird taste so this is an exception
                    numericAmount = (Math.round(numericAmount * 1.5 * 4) / 4);
                }

                //apply creaminess slider
                if (ingredientToAdd.id === "cream" || ingredientToAdd.id === "yog") {
                    numericAmount = (Math.round(numericAmount * creamVal * 4) / 4);
                }

                //apply serving size adjuster
                numericAmount = (Math.round(numericAmount * servingVal * 4) / 4);

                //convert back into readable format
                numericAmount = that.decimalToFraction(numericAmount);
                let newAmount = numericAmount + " " + units;
                ingredientToAdd.amount = newAmount;

                //add ingredient to display array
                ingredientsArray.push(ingredientToAdd);
            })
        }

        this.ingredientsArray = ingredientsArray;

        //turn into jsx
        let ingredientsListJsx = [];
        ingredientsArray.forEach(function (ingredient) {
            const displayString = ingredient.name + ": " + ingredient.amount;
            let jsxIngredient = <div key={displayString} className="i-ingredient-container">
                <span >{displayString}</span>
            </div>
            ingredientsListJsx.push(jsxIngredient);
        })

        pageContents = <div className="i-recipe-selector">
            <div className="i-ingredients-container">
                {ingredientsListJsx}
            </div>
        </div>;

        return pageContents;
    }

    //Function to convert a decimal into a nice fraction
    decimalToFraction(decimal) {
        let obj = this.getFraction(decimal);

        if (obj.numerator === obj.denominator) {
            return 1;
        }

        if (obj.denominator === 1) {
            return obj.numerator;
        }

        if (obj.numerator > obj.denominator) {
            return decimal;
        }

        return obj.numerator + "/" +  obj.denominator;
    }

    //funciton to convert decimal into basic fraction object
    getFraction = (decimal) => {
        for (var denominator = 1; (decimal * denominator) % 1 !== 0; denominator++);
        return { numerator: decimal * denominator, denominator: denominator };
    }

    //Funciton to build the inner page for cook method
    buildMethod(pageContents) {

        const selectedRecipe = this.state.selectedRecipe;
        const ingredientsArray = this.ingredientsArray;
        let method = [];
        let i = 1;
        if (this.ingredientsArray !== undefined && selectedRecipe.name !== "") {
            selectedRecipe.methodSteps.forEach(function (methodItem) {
                ingredientsArray.forEach(function(ingredient){
                    let ingredientReplacer = "{" + ingredient.id + "}";
                    methodItem = methodItem.replace(ingredientReplacer, ingredient.name);
                })
                method.push(<li key={i} className="i-method-item">{methodItem}</li>);
                i++;
            })
        }

        pageContents = <div className="i-recipe-selector">
            <div className="i-method-container">
                <ul className="i-method-list">
                    {method}
                </ul>
            </div>
        </div>;

        return pageContents;
    }


    //main function for rendering the display of this page 
    render() {

        let innerPageObj = this.getActiveInnerPage();
        let innerPage = this.buildInnerPageContainer(innerPageObj);

        const jsx = (
            <div className="i-home-page-wrapper height-100">
                <header className="landing-page-header"></header>
                <div className="i-page-body">
                    <div className="i-page">
                        {innerPage}
                    </div>
                </div>
            </div>
        );
        return jsx;
    }
}

export default Indian;
