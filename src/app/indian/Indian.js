import './Indian.css';
import '../../index.css';
import '../landing-page/LandingPage.css';
import '../../external/font-awesome/font-awesome.min.css'
import Slider from '../slider/Slider'
import React from 'react';

/**
 * class to define the page for Indian recipes
 */
class Indian extends React.Component {

    //constructor for this class
    constructor(props) {
        super(props);

        this.title = "Indian Cuisine";

        let hydrabadhi = {
            "name": "Hydrabadhi",
            "brief": "A delicious creamy curry from the hydrabadhi region, made with a selection of ground spices and aromatics",
            "cookingTime": "2h",
            "defaultServingSize": 2,
            "accompniment": "Chapattis or Garlic and Coriander Naan",
            "ingredients": [{ "name": "Double Cream", "amount": "200ml", "swaps": [{ "Creme Fraische": "200ml" }, { "Milk": "100ml" }], "id": "cream" },
            { "name": "Natural Yoghurt", "amount": "100ml", "swaps": [], "id": "yog" },
            { "name": "Brown Onion", "amount": "1", "swaps": [{ "Shalotts": "4" }, { "Red Onion": "1" }], "id": "onion" },
            { "name": "Tomatos", "amount": "4", "swaps": [{ "Tinned Tomatos": "400ml" }], "id": "tomatos" },
            { "name": "Fresh Garlic", "amount": "6 Cloves", "swaps": [{ "Garlic Paste": "1 tblsp" }, { "Garlic Powder": "1/2 tblsp" }], "id": "garlic" },
            { "name": "Fresh Ginger", "amount": "30g", "swaps": [{ "Ginger Paste": "2 tsp" }, { "Ginger Powder": "1 tsp" }], "id": "ginger" },
            { "name": "Fresh Coriander", "amount": "30g", "swaps": [], "id": "coriander" },
            { "name": "Fresh Chillies", "amount": "1", "swaps": [], "id": "chillies" },
            { "name": "Olive Oil", "amount": "4 tblsp", "swaps": [{ "Vegetable Oil": "2 tblsp" }, { "Sesemee Oil": "1 tblsp" }, { "Sunflower Oil": "2 tblsp" }], "id": "oil" },
            { "name": "Lamb", "amount": "400g", "swaps": [{ "Chicken": "400g" }, { "Beef": "300g" }], "id": "meat" },
            { "name": "Coriander Seeds/Powder", "amount": "1 tblsp", "swaps": [], "id": "coriander" },
            { "name": "Cumin Seeds/Powder", "amount": "1/2 tblsp", "swaps": [], "id": "cumin" },
            { "name": "Black Cumin Seeds/Powder", "amount": "1/2 tblsp", "swaps": [], "id": "blackCumin" },
            { "name": "Cloves", "amount": "6", "swaps": [{ "star anise": "1" }, { "fennel seeds": "1/2 tsp" }], "id": "cloves" },
            { "name": "Black Peppercorns", "amount": "6", "swaps": [], "id": "pepper" },
            { "name": "Poppy Seeds", "amount": "1 tblsp", "swaps": [], "id": "poppy" },
            { "name": "Black Cardamoms (seeds only)", "amount": "2", "swaps": [{ "Green Cardamoms": "4" }], "id": "cardamoms" },
            { "name": "Dried Fenugreek Leaves", "amount": "1 tblsp", "swaps": [{ "Fenugreek Seeds": "1 tblsp" }], "id": "fenugreek" },
            { "name": "Cinamon Powder", "amount": "1 tsp", "swaps": [{ "Cassia Bark": "10g" }, { "sugar": "1/2 tsp" }], "id": "cinamon" },
            { "name": "Salt", "amount": "1/2 tblsp", "swaps": [], "id": "salt" },
            { "name": "Turmeric Powder", "amount": "1/4 tblsp", "swaps": [], "id": "turnmeric" },
            { "name": "Chillie Powder", "amount": "1/4 tblsp", "swaps": [{ "Chillie Flakes": "1/4 tblsp" }], "id": "chilliePowder" },
            { "name": "Garam Masala", "amount": "1/2 tblsp", "swaps": [], "id": "garamMasala" },
            ],
        };

        let tikkaBalti = { "name": "Tikka Balti" };
        let saag = { "name": "Saag Gosht" };

        this.recipes = [hydrabadhi, saag, tikkaBalti];
        this.numPages = 4;

        this.maxServingSize = 10;

        this.nextPageButton = <div className="i-next-page-button"><button className="fa fa-long-arrow-right" onClick={() => this.nextPage()}></button></div>;
        this.prevPageButton = <div className="i-prev-page-button"><button className="fa fa-long-arrow-left"  onClick={() => this.prevPage()}></button></div>;
        this.prevPageButtonPlaceHolder = <div className="i-prev-page-button i-placeholder-button"><button className="fa fa-long-arrow-left"></button></div>;
        this.nextPageButtonPlaceHolder = <div className="i-next-page-button i-placeholder-button"><button className="fa fa-long-arrow-right"></button></div>;

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
            innerPage: 1, selectedRecipe: { "name": "" }, dairyFree: false, glutenFree: false, vegetarian: false
        };

        // This binding is necessary to make `this` work in the callback
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.setInnerPage = this.setInnerPage.bind(this);
        this.getActiveInnerPage = this.getActiveInnerPage.bind(this);
        this.buildHydrabadhiMethod = this.buildHydrabadhiMethod.bind(this);
        this.buildInnerPageContainer = this.buildInnerPageContainer.bind(this);
        this.recipeSelected = this.recipeSelected.bind(this);
        this.sliderChanged = this.sliderChanged.bind(this);
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

        let nextPageButton = (this.state.innerPage > this.numPages-1) ? this.nextPageButtonPlaceHolder : this.nextPageButton;
        let prevPageButton = (this.state.innerPage < 2) ? this.prevPageButtonPlaceHolder : this.prevPageButton;

        let innerPageContainer = <div className="i-inner-page-container">
            {prevPageButton}
            {nextPageButton}
            <div>
                <div className="i-inner-page-title-container">
                    <span className="i-inner-page-title">{pageTitle}</span>
                </div>
                <div className="i-inner-page-body-container">
                    <div className="i-inner-page-body">{pageContents}</div>
                </div>
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
            let li = <li key={recipe.name} className={isRecipeSelected ? "i-recipe-option i-recipe-selected" : "i-recipe-option"} onClick={() => that.recipeSelected(recipe)}>{recipe.name}</li>
            list.push(li);
        })

        pageContents = <div className="i-recipe-selector">
            <ul className="i-recipe-options">
                {list}
            </ul>
        </div>;

        return pageContents;
    }

    //Funciton to build the inner page for Tools to edit recipe
    buildRecipeTools(pageContents) {

        //tool for serving size
        let servingSizeOptions = [];
        for (let i = 0; i < this.maxServingSize; i++) {
            servingSizeOptions.push(<option key={i+1}>{i + 1}</option>);
        }

        let numPeopleTool = <div><span>Servings: </span><select>
            {servingSizeOptions}
        </select></div>

        //tool for heat
        let heatTool = <Slider sliderColour="red" sliderName="curryHeat" sliderDisplayTag="Heat:" sliderChanged={this.sliderChanged} />;

        //checkboxes
        let dairyFree = this.buildCheckbox(this.state.dairyFree, "dairyCheckbox", "Dairy Free: ");
        let vegetarian = this.buildCheckbox(this.state.vegetarian, "vegetarianCheckbox", "Vegetarian:  ");
        let glutenFree = this.buildCheckbox(this.state.glutenFree, "glutenCheckbox", "Gluten Free: ");
        let checkboxes = <div className="i-check-box-container">
            {vegetarian}
            {dairyFree}
            {glutenFree}
        </div>;

        //tool for dry vs creamy
        let creaminessTool = <Slider sliderName="curryCreaminess" sliderDisplayTag="Creaminess:" sliderChanged={this.sliderChanged} />;

            
        pageContents = <div className="i-recipe-selector">
            <ul className="i-recipe-options">
                {numPeopleTool}
                {heatTool}
                {creaminessTool}
                {checkboxes}
            </ul>
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
            <label for={id} >
                <span>{tag} </span>
            </label>
            <input id={id} type="checkbox" vlaue={val} />
        </div>;

        return checkBox;
    }

    //Function called when a slider declared on this page changes value
    sliderChanged(sliderValue, sliderName) {
        console.log(sliderValue);
        console.log(sliderName);
    }

    //Function to build the inner page to allow user to alter the ingredients
    buildIngredientsEditor(pageContents) {
        let ingredients = ""

        pageContents = <div className="i-recipe-selector">
            <ul className="i-recipe-options">
                {ingredients}
            </ul>
        </div>;

        return pageContents;
    }

    //Funciton to build the inner page for cook method
    buildMethod(pageContents) {

        let methodText = "";
        switch (this.state.selectedRecipe.name) {
            case "Hydranadhi":
                methodText = this.buildHydrabadhiMethod();
                break;
            case "Saag":
                methodText = this.buildSaagMethod();
                break;
            case "Tikka Balti":
                methodText = this.buildBaltiMethod();
                break;
            default:
                methodText = "";
                break;
        }

        pageContents = <div className="i-recipe-selector">
            <span>{methodText}</span>
        </div>;
    }


    //Function to build the method string for hydrabadhi recipe
    buildHydrabadhiMethod() {
        let method = "";

        return method;
    }

    //Function to build the method string for Saag recipe
    buildSaagMethod() {
        let method = "";

        return method;
    }

    //Function to build the method string for Tikka Balti recipe
    buildBaltiMethod() {
        let method = "";

        return method;
    }


    //Funciton to select a recipe when clicked on
    recipeSelected(selection) {
        this.setState(state => ({
            selectedRecipe: selection
        }));
        this.nextPage();
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
