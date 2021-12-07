import React, { Component } from 'react'
import Question   from './Question'


export default class Training extends Component {
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div>
			<h1>Training Trial</h1>
			<Question type="select" label="Color" choices={["orange","green"]} />
			</div>
		)
	}
}