import './App.css';
import AppWrapper from './app-wrapper/appWrapper';
import React from 'react';


/**
 * Main Application rendering function, only holds wrapper class which controls main display
 */
function App() {

    //add a landing page and menu
    const appJSX =(
        <React.StrictMode>
            <AppWrapper/>
        </React.StrictMode>
        );

    return appJSX;
}

export default App;
