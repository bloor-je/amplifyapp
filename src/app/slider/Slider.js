import './Slider.css';
import React from 'react';

/**
 * Class for slider component
 */
class Slider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {value:50};

        // This binding is necessary to make `this` work in the callback
        this.sliderChange = this.sliderChange.bind(this);
    }

    //function called when slider is slid
    sliderChange(sliderVal) {
        this.setState(state => ({
            value: sliderVal
        }));
        this.props.sliderChanged(sliderVal, this.props.sliderName); //this is a callback to wherever the component is initialised
    }

    //JSX rendering
    render() {
        const jsx = (
            <div className="slider-container">
                <div>
                    <span>{this.props.sliderDisplayTag} </span>
                </div>
                <input type="range" min="1" max="100" value={this.state.value} className="slider" id="slider" onChange={event => this.sliderChange(event.target.value)} />
            </div>
        );

        return jsx;
    }
}

export default Slider;
