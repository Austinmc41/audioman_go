import React, { Component } from 'react';

import Button from './Button';
import Form from './Form';

class HomePage extends Component {
    constructor(props){
		super(props);
		this.state = {}
	}

    render() {
        var file = this.props.file;
        return (
            <div className='container' style={{marginLeft: "40%"}}>
                <Button/>
                <Form/>
            </div>
        )
    }
}

export default HomePage;