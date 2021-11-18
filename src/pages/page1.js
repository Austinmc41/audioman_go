import React, { Component } from 'react';

import Button from '../components/Button';
import Form from '../components/Form';

class Page1 extends Component {
    constructor(props){
		super(props);
		this.state = { 
			type: '', 
			label: '', 
			choices: [], 
		}
	}

    render() {
        return (
            <div className='container' style={{marginLeft: "40%"}}>
                <Button/>
                <Form/>
            </div>
        )
    }
}

export default Page1;