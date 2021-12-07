import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

import Button from './Button';
import Form from './Form';


class SoundPage extends Component {
    constructor(props){
		super(props);
		this.state = {}
	}

    handleClick = (e) => {
        var userAnswers = [];
        $(".question").each(function(index) {
            userAnswers.push($(this).find('input:radio:checked').val());
        });
        var page = this.props.nextPage.substring(5) - 3;

        var result = {};
        for (var i = 0; i < userAnswers.length; i++) {
            result["page" + page + "_question" + (i+1).toString()] = userAnswers[i];
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