import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

import Button from './Button';
import Question from './Question';
import Form from './Form';
import NasaTLXForm from './NasaTLXForm';


class SoundPage extends Component {
    constructor(props){
		super(props);
		this.state = {}
	}

    handleClick = (e) => {
        const newperson = {
            person_name: "1",
            person_position: "2",
            person_level: "3"
        };
      
        axios
            .post("http://localhost:5000/record/add", newperson)
            .then((res) => console.log(res.data));
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
                    <Form questions={questions}/>
                    <br></br>
                    <NasaTLXForm></NasaTLXForm>
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