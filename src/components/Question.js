import React, { Component } from 'react';


class Question extends Component {
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
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Example textarea</label>
                <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm"/>
            </div>
        )
    }
}

export default Question;