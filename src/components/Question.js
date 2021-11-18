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
        if (this.props.type === "text") {
            return (
                <div class="form-group">
                    <p>{this.props.label}</p>
                    <input class="form-control" type={this.props.type} placeholder=""/>
                    <br></br>
                </div>
            )
        } else if (this.props.type === "radio") {
            return (
                <div class="form-check">
                    <p>{this.props.label}</p>
                    {this.props.choices.map((item, index) => (
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name={item} id={item} value={item}/>
                            <label class="form-check-label" for={item}>
                                {item}
                            </label>
                        </div>
                    ))}
                    <br></br>
                </div>
            )
        } 
    }
}

export default Question;