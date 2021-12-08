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
                <div className="form-group col-md-6 question">
                    <label htmlFor={"inputid" + this.props.label}>{this.props.label}</label>
                    <input id={"inputid" + this.props.label} className="form-control" type={this.props.type} placeholder="" onChange={this.handleChange} />
                    <br></br>
                    <br></br>
                </div>
            )
        } else if (this.props.type === "radio") {
            return (
                <fieldset className="question">
                    <legend>{this.props.label}</legend>
                    {this.props.choices.map((item, index) => (
                        <div key={item + this.props.label} className="form-check">
                            <input className="form-check-input" type={"radio"} name={this.props.label} id={item} value={item} onChange={this.handleChange} />
                            <label className="form-check-label" htmlFor={item}>
                                {item}
                            </label>
                        </div>
                    ))}
                    <br></br>
                </fieldset>
            )
        } else if (this.props.type === "select") {
            return (
                <div className="question">
                    <label htmlFor={this.props.label}>{this.props.label}</label>
                      <select id={this.props.label} onChange={this.handleChange}>
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