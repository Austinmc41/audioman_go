import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Button from './Button';
import Question from './Question';
import Form from './Form';
import NasaTLXForm from './NasaTLXForm';

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
            <div className='container' style={{marginLeft: "30%"}}>
                <Button/>
                <br></br>
                <strong>{this.props.data["passageName"]}</strong>
                <p style={{width: "50%"}}>{this.props.data["passage"]}</p>
                <br></br>
                <Form questions={questions}/>
                <br></br>
                <NasaTLXForm></NasaTLXForm>
                {(this.props.nextPage) &&
                    <NavLink exact activeClassName="active" to={this.props.nextPage}>Next Page</NavLink>
                }  
            </div>
        )
    }
}

export default SoundPage;