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
                <div class="form-group col-md-6 question">
                    <label for={"inputId" + this.props.label}>{this.props.label}</label>
                    <input Id={"inputId" + this.props.label} class="form-control" type={this.props.type} placeholder=""/>
                    <br></br>
                    <br></br>
                </div>
            )
        } else if (this.props.type === "radio") {
            return (
                <fieldset class="question">
                    <legend>{this.props.label}</legend>
                    {this.props.choices.map((item, index) => (
                        <div class="form-check">
                            <input class="form-check-input" type={"radio"} name={this.props.label} id={item} value={item} />
                            <label class="form-check-label" for={item}>
                                {item}
                            </label>
                        </div>
                    ))}
                    <br></br>
                </fieldset>
            )
        } 
    }
}

export default Question;