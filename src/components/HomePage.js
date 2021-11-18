import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Button from './Button';
import Form from './Form';
import * as ROUTES from "../constants/routes";


class HomePage extends Component {
    constructor(props){
		super(props);
		this.state = {}
	}

    render() {
        return (
            <div className='container' style={{marginLeft: "40%"}}>
                <Button/>
                <Form/>
                <NavLink exact activeClassName="active" to={ROUTES.PAGE2}>Next Page</NavLink>
            </div>
        )
    }
}

export default HomePage;