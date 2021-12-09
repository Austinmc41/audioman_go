import React, { Component } from 'react';
import { Navigate } from "react-router-dom";

import Question  from './Question'

export default class Consent extends Component {
	constructor(props){
		super(props)
		this.state = {
			condition: false,
			Navigate: false
		}
		this.handleConditionChange = this.handleConditionChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(){
		this.setState({Navigate: true})
	}

	handleConditionChange(e, value){
		this.props.handleConditionChange(value)
		this.setState({condition:true})
	}

	render(){
		return(
			<div>
			{this.state.Navigate ? <Navigate to={this.props.nextPage} /> : null}
			<h1>First Condition</h1>
			<Question type="radio" label="First Condition" handleChange={this.handleConditionChange} choices={["monaural", "pan"]} />
			<h1>Consent</h1>
			<p>You are being asked to be a volunteer in a research study.  The purpose of this study is to figure out how many sounds people can identify while still listening to a speaker. The evaluation will take approximately 1 hour to complete.  You will be assigned a random number, and that number will be associated with your data. There will be no personally identifiable information collected during this study. The risks involved are no greater than those involved in daily activities.  You will not benefit or be compensated for joining this study. We will comply with any applicable laws and regulations regarding confidentiality. To make sure that this research is being carried out in the proper way, the Georgia Institute of Technology IRB may review study records.  The Office of Human Research Protections may also look at study records.   If you have any questions about the study, you may contact Bruce Walker at: (404) 894-8265. If you have any questions about your rights as a research subject, you may contact Ms. Melanie Clark, Georgia Institute of Technology at (404) 894-6942. Thank you for participating in this study.</p>
			<br/>
			<button disabled={!this.state.condition} onClick={this.handleClick}>By completing this online survey, you indicate your consent to be in the study.</button>

		</div>
		)
	}
}