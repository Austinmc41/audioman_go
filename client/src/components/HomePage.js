import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

import Button from './Button';
import Form from './Form';
import * as ROUTES from "../constants/routes";
import demographics from '../constants/demographics';


class HomePage extends Component {
    constructor(props){
		super(props);
		this.state = {}
	}

    render() {
        return (
            <div>
                <div className='container' style={{marginLeft: "30%"}}>
                    <Button/>
                    <br></br>
                    <Form questions={demographics}/>
                    <br></br>
                </div>
                <div className="container" style={{marginLeft: "65%"}}>
                    <NavLink exact activeClassName="active" to={ROUTES.PAGE2}>
                        <FontAwesomeIcon icon={faLongArrowAltRight} size="4x"/>
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