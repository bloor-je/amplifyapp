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
        this.recipes = ["Murgh Hydrabadhi", "Chicken Tikka Balti", "Saag Gosht"];
        this.numPages = 4;

        this.nextPageButton = <div className="next-page-button"><button onClick={() => this.nextPage()}>N</button></div>;
        this.prevPageButton = <div className="prev-page-button"><button onClick={() => this.prevPage()}>P</button></div>;

        this.innerPage1 = <div className="page-one">
            <span>Choose Base Recipe</span>
        </div>;

        this.innerPage2 = <div className="page-two">
            <span>Personalise</span>
        </div>;

        this.innerPage3 = <div className="page-two">
            <span>Check Ingredients</span>
        </div>;

        this.innerPage4 = <div className="page-two">
            <span>Cook!</span>
        </div>;

        //put inner page on state so that it re renders the screen if this changes
        this.state = {innerPage: 1 };

        // This binding is necessary to make `this` work in the callback
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.setInnerPage = this.setInnerPage.bind(this);
        this.getActiveInnerPage = this.getActiveInnerPage.bind(this);
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

    //function called from the jsx to retrieve the active page
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

    //main function for rendering the display of this page 
    render() {
        let innerPage = this.getActiveInnerPage();
        let nextPageButton = (this.state.innerPage > 3) ? <div></div> : this.nextPageButton;
        let prevPageButton = (this.state.innerPage < 2) ? <div></div> : this.prevPageButton;

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
