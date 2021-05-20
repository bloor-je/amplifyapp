import './UnderConstruction.css';
import '../../index.css';
import '../landing-page/LandingPage.css';
import curry from '../../images/curry.jpg';
import pasta from '../../images/homemade pasta.jpg';
import herbs from '../../images/herbs.jpg';

import React from 'react';

/**
 * class to define a basic place holder page for web pages still being built
 */
class ConstructionPage extends React.Component {

    //constructor for this class
    constructor(props) {
        super(props);

        this.innerPage1 = <div className="page page-one">
            <div className="inner-page-container">
                <span className="title">Sorry This Page is Still Being Built!</span>
                <div className="body-container">
                    <span className="body">Please use the menu in the top left corner to access a different cuisine page for more delicious recipes!</span>
                    <img className="image-wrapper" alt="herbs" src={herbs} />
                    <img className="image-wrapper" alt="Curry" src={curry} />
                    <img className="image-wrapper" alt="pasta" src={pasta} />
                </div>
            </div>
        </div>;
    }

    //main function for rendering the display of this page 
    render() {
        let innerPage = this.innerPage1;

        const jsx = (
            <div className="construction-home-page-wrapper height-100">
                <header className="landing-page-header">
                </header>
                <div className="construction-page-body">
                    {innerPage}
                </div>
            </div>
        );
        return jsx;
    }
}

export default ConstructionPage;
