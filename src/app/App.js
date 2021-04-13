import './App.css';
import LandingPage from './landing-page/LandingPage';
import Menu from './menu/Menu';
import React from 'react';


/**
 * Main Application class, controls which page is displayed, called from index.js
 */
function App() {

    //add a landing page and menu
    const appJSX =(
        <React.StrictMode>
            <Menu />
            <LandingPage />
        </React.StrictMode>
        );

    return appJSX;
}

export default App;
