import React, { Component } from 'react'
import Question   from './Question'
import { getSoundNames } from './panWads'
import _ from 'lodash'

import SoundTrial from './soundTrial'

export default class Training extends Component {
	constructor(props){
		super(props)
		this.state = {
			condition: this.props.condition,
			soundScape: this.props.soundScape,
			increment: 2,
			maxSounds: 20,
			trialLength: 60000,
		}
		this.soundNames = getSoundNames()
		this.startTrial = this.startTrial.bind(this)
		this.handleComplete = this.handleComplete.bind(this)
	}

	startTrial(){
//		this.props.spk(trainingPassage.passage)
//			.then(stopSounds) // not working for some reason
	}

	handleComplete(state){
		alert("you are done")
		console.log(state.trials)
	}

	render(){
		return(
			<div>
			<h1>Trial</h1>
			<SoundTrial trialLength={this.state.trialLength} maxSounds={this.state.maxSounds} increment={this.state.increment} soundScape={this.state.soundScape} condition={this.state.condition} onNext={this.handleNext} onComplete={this.handleComplete} allowReset={false} soundOptions={this.soundNames} />
			</div>
		)
	}
}