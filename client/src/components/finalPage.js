import React, { Component } from 'react'
export default class FinalPage extends Component {
	constructor(props){
		super(props)
	}

render(){
		return(
		<div>
		<h1>Thank You!</h1>
		<p>Thank you for participating in this study. You are all finished. congradulations!</p>
		<a
				href={`data:text/json;charset=utf-8,${encodeURIComponent(
				  JSON.stringify(this.props.data)
				)}`}
				download={`StudyResults_p_${this.props.id}.json`}
			>
				{`Download Study Results`}
			</a>
		</div>
		)
	}
}