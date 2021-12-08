import React, { Component } from 'react';


class Question extends Component {
    constructor(props){
		super(props);
		this.state = { 
			type: '', 
			label: '', 
			choices: [], 
		}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e){
		if(this.props.handleChange) this.props.handleChange(e, e.target.value, this.props)
	}

    render() {
        if (this.props.type === "text") {
            return (
                <div class="form-group col-md-6 question">
                    <label htmlFor={"inputId" + this.props.label}>{this.props.label}</label>
                    <input Id={"inputId" + this.props.label} class="form-control" type={this.props.type} placeholder="" onChange={this.handleChange} />
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
                            <input class="form-check-input" type={"radio"} name={this.props.label} Id={item} value={item} onChange={this.handleChange} />
                            <label class="form-check-label" htmlFor={item}>
                                {item}
                            </label>
                        </div>
                    ))}
                    <br></br>
                </fieldset>
            )
        } else if (this.props.type === "select") {
            return (
                <div class="question">
                    <label htmlFor={this.props.label}>{this.props.label}</label>
                      <select Id={this.props.label} onChange={this.handleChange}>
                      {this.props.choices.map((item, index) => (
                          <option key={this.props.label+item} value={item}>
                                {item}
                        </option>
                    ))}
                    </select>
                    <br></br>
                  </div>
            )
        }  
    }
}

export default Question;