import LandingPage from '../landing-page/LandingPage';
import Indian from '../indian/Indian';
import Menu from '../menu/Menu';
import React from 'react';

/**
 * Top level parent class for the app
 */
class AppWrapper extends React.Component {

    //constructor
    constructor(props) {
        super(props);
        this.changeWebsitePage = this.changeWebsitePage.bind(this);
        this.getActivePage = this.getActivePage.bind(this);
        this.state = { activePage: "home" };
    }

    //function called when menu item is clicked to change page, called from child
    changeWebsitePage(pageName) {
        this.setState(state => ({
            activePage: pageName
        }));
    }

    //function called from the jsx to retrieve the active page
    getActivePage() {
        let activePage = <LandingPage />
        switch (this.state.activePage) {
            case "home":
                activePage = <LandingPage />;
                break;
            case "indian":
                activePage = <Indian />; //ToDo replace with page 2 etc
                break;
            case "italian":
                activePage = <LandingPage />;
                break;
            case "thai":
                activePage = <LandingPage />;
                break;
            default:
                break;
        }
        return activePage;
    }


    //rendering of app, holds menu and whichever page is being displayed currently
    render() {
        let page = this.getActivePage();
        let jsx = (
            <React.StrictMode>
                <Menu changeWebsitePage={this.changeWebsitePage} />
                {page}
            </React.StrictMode>
        );

        return jsx;
    }
}

export default AppWrapper;
