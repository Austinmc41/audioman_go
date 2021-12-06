import React, { Component } from 'react';

import Question  from './Question'

export default class Consent extends Component {
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div>
			<h1>First Condition</h1>
			<Question type="radio" label="First Condition" choices={["Monaural", "Binaural"]} />
		</div>
		)
	}
}