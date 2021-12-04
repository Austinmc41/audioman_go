import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

import Button from './Button';
import Question from './Question';
import Form from './Form';
import NasaTLXForm from './NasaTLXForm';
import categories from '../constants/NasaTLX';


class SoundPage extends Component {
    constructor(props){
		super(props);
		this.state = {
            mental: null,
            physical: null,
            temporal: null,
            performance: null,
            effort: null,
            frustration: null
        }
	}

    getSliderValue = (attribute, value) => {
        if (attribute === "mental") this.setState({mental: value});
        else if (attribute === "physical") this.setState({physical: value});
        else if (attribute === "temporal") this.setState({temporal: value});
        else if (attribute === "performance") this.setState({performance: value});
        else if (attribute === "effort") this.setState({effort: value});
        else if (attribute === "frustration") this.setState({frustration: value});
        //this.setState({attribute: value});
        console.log(attribute, value);
        console.log(this.state);
    }

    handleClick = (e) => {
        var userAnswers = [];
        $(".question").each(function(index) {
            userAnswers.push($(this).find('input:radio:checked').val());
        });
        var page = this.props.nextPage.substring(5) - 2;

        var result = {};
        for (var i = 0; i < userAnswers.length; i++) {
            result["page" + page + "_question" + (i+1).toString()] = userAnswers[i];
        }
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
        var questions = this.props.data.questions.map((obj) => {
            obj['label'] = obj['question'];
            obj['type'] = "radio";
            return obj;
        });
        
        if (!questions) return "Loading...";
        return (
            <div>
                <div className='container' style={{marginLeft: "30%"}}>
                    <Button/>
                    <br></br>
                    <strong>{this.props.data["passageName"]}</strong>
                    <p style={{width: "50%"}}>{this.props.data["passage"]}</p>
                    <br></br>
                    <Form id="form" questions={questions}/>
                    <br></br>
                    <NasaTLXForm id="nasa" func={this.getSliderValue}></NasaTLXForm>
                    <br></br>
                </div>
                <div className="container" style={{marginLeft: "65%"}}>
                    {(this.props.nextPage) &&
                        <NavLink exact activeClassName="active" to={this.props.nextPage}>
                            <FontAwesomeIcon onClick={this.handleClick} icon={faLongArrowAltRight} size="4x"/>
                        </NavLink>
                    }
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br> 
            </div>
        )
    }
}

export default SoundPage;