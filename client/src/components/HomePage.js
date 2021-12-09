import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

import Form from './Form';
import * as ROUTES from "../constants/routes";
import demographics from '../constants/demographics';
import $ from 'jquery';



class HomePage extends Component {
    constructor(props){
		super(props);
		this.state = {}
	}

    handleClick = (e) => {
        var userAnswers = [];
        $(".question").each(function(index) {
            if ($(this).find('input:radio:checked').val()) {
                userAnswers.push($(this).find('input:radio:checked').val());
            } else {
                userAnswers.push($(this).find('input').val());
            }
        });

        var result = {};
        result["age"] = userAnswers[0];
        result["gender"] = userAnswers[1];
        result["nationality"] = userAnswers[2];
        result["musical_ability"] = userAnswers[3];
        result["anxiety_level"] = userAnswers[4];
        result["hearing_level"] = userAnswers[5];

        result["_id"] = this.props.idProp;
        this.props.handleDataChange("demographics", result)
        axios
            .post("http://localhost:5000/record/add", result)
            .then((res) => console.log(res.data));
    }

    render() {
        return (
            <div>
            <h1>Demographics</h1>
                <div className='container' style={{marginLeft: "30%"}}>
                    <Form questions={demographics}/>
                    <br></br>
                </div>
                <div className="container" style={{marginLeft: "65%"}}>
                    <NavLink exact activeClassName="active" to={this.props.nextPage} onClick={this.handleClick}>
                        <FontAwesomeIcon icon={faLongArrowAltRight} size="4x"/>
                        Next
                    </NavLink>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br> 
            </div>
        )
    }
}

export default HomePage;