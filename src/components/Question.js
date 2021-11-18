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
                <p>{this.props.label}</p>
                <input class="form-control form-control-sm" type="text" placeholder=""/>
            </div>
        )
    }
}

export default Question;