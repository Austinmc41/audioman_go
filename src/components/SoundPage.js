import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Button from './Button';
import Question from './Question';
import Form from './Form';

class SoundPage extends Component {
    constructor(props){
		super(props);
		this.state = {}
	}

    render() {
        var questions = this.props.data.questions.map((obj) => {
            obj['label'] = obj['question'];
            obj['type'] = "radio";
            return obj;
        });
        
        if (!questions) return "Loading...";
        return (
            <div className='container' style={{marginLeft: "40%"}}>
                <Button/>
                <p>{this.props.data["passageName"]}</p>
                <p>{this.props.data["passage"]}</p>
                <br></br>
                <Form questions={questions}/>
                {(this.props.nextPage) &&
                    <NavLink exact activeClassName="active" to={this.props.nextPage}>Next Page</NavLink>
                }  
            </div>
        )
    }
}

export default SoundPage;