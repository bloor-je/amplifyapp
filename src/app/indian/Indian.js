import './Indian.css';
import '../../index.css';
import '../landing-page/LandingPage.css';
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
                { "name": "Fresh Garlic", "amount": "6 Cloves", "swaps": [{ "Garlic Paste": "1 tblsp" }, {"Garlic Powder": "1/2 tblsp"}], "id": "garlic" },
                { "name": "Fresh Ginger", "amount": "30g", "swaps": [{ "Ginger Paste": "2 tsp" }, { "Ginger Powder": "1 tsp" }], "id": "ginger" },
                { "name": "Fresh Coriander", "amount": "30g", "swaps": [], "id": "coriander" },
                { "name": "Fresh Chillies", "amount": "1", "swaps": [], "id": "chillies" },
                { "name": "Olive Oil", "amount": "4 tblsp", "swaps": [{ "Vegetable Oil": "2 tblsp" }, { "Sesemee Oil": "1 tblsp" },{ "Sunflower Oil": "2 tblsp" }], "id": "oil" },
                { "name": "Lamb", "amount": "400g", "swaps": [{ "Chicken": "400g" }, { "Beef": "300g" }], "id": "meat" },
                { "name": "Coriander Seeds/Powder", "amount": "1 tblsp", "swaps": [], "id": "coriander" },
                { "name": "Cumin Seeds/Powder", "amount": "1/2 tblsp", "swaps": [], "id": "cumin" },
                { "name": "Black Cumin Seeds/Powder", "amount": "1/2 tblsp", "swaps": [], "id": "blackCumin" },
                { "name": "Cloves", "amount": "6", "swaps": [{ "star anise": "1" }, {"fennel seeds": "1/2 tsp"}], "id": "cloves" },
                { "name": "Black Peppercorns", "amount": "6", "swaps": [], "id": "pepper" },
                { "name": "Poppy Seeds", "amount": "1 tblsp", "swaps": [], "id": "poppy" },
                { "name": "Black Cardamoms (seeds only)", "amount": "2", "swaps": [{"Green Cardamoms": "4"}], "id": "cardamoms" },
                { "name": "Dried Fenugreek Leaves", "amount": "1 tblsp", "swaps": [{ "Fenugreek Seeds": "1 tblsp" }], "id": "fenugreek" },
                { "name": "Cinamon Powder", "amount": "1 tsp", "swaps": [{ "Cassia Bark": "10g" }, {"sugar": "1/2 tsp"}], "id": "cinamon" },
                { "name": "Salt", "amount": "1/2 tblsp", "swaps": [], "id": "salt" },
                { "name": "Turmeric Powder", "amount": "1/4 tblsp", "swaps": [], "id": "turnmeric" },
                { "name": "Chillie Powder", "amount": "1/4 tblsp", "swaps": [{ "Chillie Flakes": "1/4 tblsp" }], "id": "chilliePowder" },
                { "name": "Garam Masala", "amount": "1/2 tblsp", "swaps": [], "id": "garamMasala" },
            ],
        };

        let tikkaBalti = { "name": "Tikka Balti" };
        let saag = { "name": "Saag" };

        this.recipes = [hydrabadhi, tikkaBalti, saag];
        this.numPages = 4;

        this.nextPageButton = <div className="next-page-button"><button onClick={() => this.nextPage()}>N</button></div>;
        this.prevPageButton = <div className="prev-page-button"><button onClick={() => this.prevPage()}>P</button></div>;

        this.innerPage1 = {
            "title": "Choose Base Recipe",
            "type": "selection",
            "options": this.recipes,
            "selector": "name"
        };

        this.innerPage2 = <div className="page page-two">
            <span>Personalise</span>
        </div>;

        this.innerPage3 = <div className="page page-two">
            <span>Check Ingredients</span>
        </div>;

        this.innerPage4 = <div className="page page-two">
            <span>Cook!</span>
        </div>;

        //put inner page on state so that it re renders the screen if this changes
        this.state = {innerPage: 1 };

        // This binding is necessary to make `this` work in the callback
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.setInnerPage = this.setInnerPage.bind(this);
        this.getActiveInnerPage = this.getActiveInnerPage.bind(this);
        this.buildInnerPageContent = this.buildInnerPageContent.bind(this);
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

    //Function to produce the content for the inner page container
    buildInnerPageContent(page) {

        //TODO here build content and append to page object
//        let innerPageContainer = <div className="inner-page-container">
 //           <span className="title">{pageTitle}</span>
  //          <div className="body-container">
  //              <span className="body">{pageText}</span>
   //         </div>
    //    </div>

        return page;
    }

    //main function for rendering the display of this page 
    render() {
        let innerPage = this.getActiveInnerPage();
        let nextPageButton = (this.state.innerPage > 3) ? <div></div> : this.nextPageButton;
        let prevPageButton = (this.state.innerPage < 2) ? <div></div> : this.prevPageButton;
        innerPage = this.buildInnerPageContent(innerPage);
        const jsx = (
            <div className="indian-home-page-wrapper height-100">
                <header className="landing-page-header">
                </header>
                <div className="indian-page-body">
                    {prevPageButton}
                    {innerPage}
                    {nextPageButton}
                </div>
            </div>
        );
        return jsx;
    }
}

export default Indian;
