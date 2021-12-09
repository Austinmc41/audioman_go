import React, { Component } from 'react'
import Question   from './Question'
import { getSoundNames } from './panWads'
import _ from 'lodash'
import { Navigate } from 'react-router-dom'

import SoundTrial from './soundTrial'

export default class Training extends Component {
	constructor(props){
		super(props)
		this.state = {
			condition: this.props.condition,
			soundScape: this.props.soundScape,
			increment: 2,
			maxSounds: 19,
			trialLength: null,
			done: false,
		}
		this.soundNames = _.shuffle(getSoundNames())
		this.startTrial = this.startTrial.bind(this)
		this.handleComplete = this.handleComplete.bind(this)
	}

	startTrial(){
//		this.props.spk(trainingPassage.passage)
//			.then(stopSounds) // not working for some reason
	}

	handleComplete(state){
		this.props.handleDataChange(`trial${this.props.trialNum}`, {
			trialNum: this.props.trialNum,
			soundScape: this.props.soundScape,
			condition: this.props.condition,
			trials: state.trials
		})
		this.setState({done:true})
	}

	render(){
		return(
			<div>
			{this.state.done ? <Navigate to={this.props.nextPage} /> : null}
			<h1>Condition {this.props.trialNum}</h1>
			<SoundTrial trialLength={this.state.trialLength} maxSounds={this.state.maxSounds} increment={this.state.increment} onPlay={this.startTrial} soundScape={this.state.soundScape} condition={this.state.condition} onComplete={this.handleComplete} allowReset={false} soundOptions={this.soundNames} />
			</div>
		)
	}
}