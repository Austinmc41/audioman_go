import React, { Component } from 'react';
import Slider from 'bootstrap-slider';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import $ from 'jquery';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Question from './Question';
import categories from '../constants/NasaTLX';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";


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

    handleClick = (e) => {
        var page = this.props.nextPage.substring(5) - 3;

        var result = {};
        for (var j = 0; j < categories.length; j++) {
            result["page" + page + "_" + categories[j]["attribute"]] = $("#" + categories[j]["attribute"]).children()[1].value;
        }

        if (page === 1) {
            result["_id"] = this.props.idProp;
            axios
                .post("http://localhost:5000/record/add", result)
                .then((res) => console.log(res.data));
        } else {
            axios
                .post("http://localhost:5000/update/" + this.props.idProp, result)
                .then((res) => console.log(res.data));
        }
    }

    render() {
        return (
            <form class="center" style={{marginLeft: "40%"}}>
                {categories.map((item, index) => (
                    <div>
                        <div>
                            <label htmlFor={item["attribute"]}>{item["label"]}</label>
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
                <div className="container" style={{marginLeft: "30%"}}>
                    {(this.props.nextPage) &&
                        <NavLink exact activeClassName="active" to={this.props.nextPage}>
                            <FontAwesomeIcon onClick={this.handleClick} icon={faLongArrowAltRight} size="4x"/>
                            Continue
                        </NavLink>
                    }
                </div>
            </form>
        )
    }
}

export default NasaTLXForm;