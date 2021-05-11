import './Menu.css';
import menuImg from '../../images/menu.png';
import React from 'react';

/**
 * Class for the menu in the top left corner of the screen
 */
class Menu extends React.Component {

    constructor(props) {
        super(props);
        const numPages = 4;
        let menuItemWidth = (100 / numPages) + "%";
        this.state = { menuOpen: false, itemWidth: menuItemWidth };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    //function called when menu icon is clicked on
    handleClick() {
        this.setState(state => ({
            menuOpen: !state.menuOpen
        }));
    }

    //function called when one of the pages in the menu is selected
    changePage(pageName) {
        this.props.changeWebsitePage(pageName); //this is a callback to app-wrapper.js
    }

    //JSX rendering
    render() {
        const jsx = (
            <div>
                <div testid="menu" className="menu-wrapper">
                    <img alt="Navigation Menu Icon"
                        onClick={this.handleClick}
                        className={this.state.menuOpen ? "rotate-open menu" : "rotate-closed menu"}
                        src={menuImg} />
                </div> 
                <div testid="menuList" className={this.state.menuOpen ? "navigation-menu" : "no-display"}>
                    <ul className="list">
                        <li className="list-item" style={{ width: this.state.itemWidth }} onClick={() => this.changePage("home")}><span>Home</span></li>
                        <li className="list-item" style={{ width: this.state.itemWidth }} onClick={() => this.changePage("indian")}><span>Indian</span></li>
                        <li className="list-item" style={{ width: this.state.itemWidth }} onClick={() => this.changePage("italian")}><span>Italian</span></li>
                        <li className="list-item" style={{ width: this.state.itemWidth }} onClick={() => this.changePage("thai")}><span>Thai</span></li>
                    </ul>
                </div>
             </div>
        );

        return jsx;
    }
}

export default Menu;
