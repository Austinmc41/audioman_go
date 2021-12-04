import React, { Component } from 'react';
import Slider from 'bootstrap-slider';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import $ from 'jquery';

import Question from './Question';
import categories from '../constants/NasaTLX';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css"


class NasaTLXForm extends Component {
    constructor(props){
		super(props);
        this.state = {
            mental: null,
            physical: null,
            temporal: null,
            performance: null,
            effort: null,
            frustration: null,
            initialValue: 50,
            categories: ["mental", "physical", "temporal", "performance", "effort", "frustration"],
            currIndex: 0,
            currCat: null
        }
	}

    render() {
        return (
            <form class="center">
                {categories.map((item, index) => (
                    <div>
                        <div>
                            <label>{item["label"]}</label>
                        </div>
                        <div id={item["attribute"]}>
                            <ReactBootstrapSlider
                                id={item["attribute"]}
                                value={this.state.initialValue}
                                change={this.changeValue}
                                slideStop={this.changeValue}
                                step={1}
                                max={100}
                                min={0}
                                orientation="horizontal"
                                reversed={false}
                                ticks={[0, 25, 50, 75, 100]}
                                ticks_positions={[0, 25, 50, 75, 100]}
                                ticks_labels={['0', '25', '50', '75', '100']}
                                ticks_snap_bounds={0}
                            />
                        </div>
                        <br></br>
                    </div>
                ))}
            </form>
        )
    }
}

export default NasaTLXForm;