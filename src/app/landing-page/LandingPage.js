import './LandingPage.css';
import '../../index.css';

/**
 * Function to define the landing page for when people first visit this website
 */
function LandingPage() {

    let title = "Wecome to Custom Recipes!";

    let welcomeText = "Custom Recipes allows a user to take a base" +
        " recipe and use some simple tools to customise the ingredients and method, based on " +
    "personal preferences, allergies, number of guests" +
        " or produce availability. The recipes included cover a range of cuisines and cultures. Enjoy!"

        const jsx = (
            <div className="landing-page height-100">
                <header className="landing-page-header">
                </header>
                <div className="landing-page-body">
                    <div className="welcome-text-wrapper">
                        <p className="title-class">
                            {title}
                        </p>
                        <p>
                            {welcomeText}
                        </p>
                    </div>
                </div>
            </div>
        );
        return jsx;

}

export default LandingPage;
