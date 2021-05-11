import './indian.css';
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
        const title = "Indian Cuisine";

        const recipes = ["Murgh Hydrabadhi", "Chicken Tikka Balti", "Saag Gosht"];
        this.state = { title: title, recipes: recipes };

    }

    render() {
        const jsx = (
            <div className="indian-home-page-wrapper height-100">
                <header className="landing-page-header">
                </header>
                <div className="indian-page-body">
                    <div className="page-one">
                        <span>AAAAAAA</span>
                    </div>
                    <div className="page-two">
                        <span>BBBBBBB</span>
                    </div>
                </div>
            </div>
        );
        return jsx;
    }
}

export default Indian;
