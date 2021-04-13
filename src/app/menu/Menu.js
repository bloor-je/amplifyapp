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
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    //function called when menu icon is clicked on
    handleClick() {
        this.setState(state => ({
            menuOpen: !state.menuOpen
        }));
    }

    //function called when the open menu is clicked on
   handleMenuClick() {
        this.handleClick();

        //set page here
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
                    <ul onClick={this.handleMenuClick} className="list">
                        <li className="list-item" style={{ width: this.state.itemWidth }}><span>Home</span></li>
                        <li className="list-item" style={{ width: this.state.itemWidth }}><span>Page 1</span></li>
                        <li className="list-item" style={{ width: this.state.itemWidth }}><span>Page 2</span></li>
                        <li className="list-item" style={{ width: this.state.itemWidth }}><span>Page 3</span></li>
                    </ul>
                </div>
             </div>
        );

        return jsx;
    }
}

export default Menu;
