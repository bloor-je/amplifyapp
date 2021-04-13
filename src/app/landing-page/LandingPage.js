import './LandingPage.css';

/**
 * Function to define the landing page for when people first visit this website
 */
function LandingPage() {

    let title = "Wecome to Custom Recipes!";

    let welcomeText = "Custom Recipes was born out of a passion for cooking delicious food and an" +
        " idea for a solution to a common cooking problem. Custom Recipes allows a user to take a base" +
        " underlying recipe and use some simple tools to customise the ingredients based on personal preferences, number of guests" +
        " or produce availability. Enjoy!"

    let additionalText = "A few months ago I took on the task to cook a curry for my family" +
        ", whilst on the face of it this sounded easy (just double the amounts of all the ingridients I normally use), the task turned out" +
        " to be a lot more challenging when one family member wanted no coriander, one asked for it to be mild, one with chicken and one" +
        " with anything but chicken (awkward buggers). Before long instead of making one simple curry I was cooking four different dishes" +
        " , the mental gymnastics of trying to keep on top of who wanted what became an issue.";

        const jsx = (
            <div className="landing-page">
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
