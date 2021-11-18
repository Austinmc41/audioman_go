import React, { Component } from 'react';

import Button from './Button';
import Question from './Question';
import Form from './Form';

class SoundPage extends Component {
    constructor(props){
		super(props);
		this.state = {}
	}

    render() {
        return (
            <div className='container' style={{marginLeft: "40%"}}>
                <Button/>
                
            </div>
        )
    }
}

export default SoundPage;