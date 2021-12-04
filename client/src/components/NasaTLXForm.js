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

    /*
    componentDidUpdate() {
        for (var i = 0; i < categories.length; i++) {
            console.log(categories[i]);
            $('#'.concat(categories[i])).click(function(){
                this.setState({currCat: categories[i]});
            });
        }
        console.log(this.state.currCat);
    }*/

    changeValue = (e) => {
        console.log(e.target.value, this.state.currCat);
        /*
        //console.log(item);
        console.log(this.state);
        console.log(this.state.categories.at(this.state.currIndex));
        console.log(this.state.categories[this.state.currIndex]);
        var attribute = this.state.categories.at(this.state.currIndex)
        console.log(e.target);
        this.setState({currIndex: this.state.currIndex + 1});
        //this.props.func(attribute, e.target.value);
        */
    }

    changeCat = (attribute) => {
        this.setState({currCat: attribute});
    }

    render() {
        return (
            <form class="center">
                {categories.map((item, index) => (
                    <div>
                        <div>
                            <label>{item["label"]}</label>
                        </div>
                        <div>
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
                                //onclick={this.changeCat(item["attribute"])}
                                //onclick={this.setState({currCat: item["attribute"]})}
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