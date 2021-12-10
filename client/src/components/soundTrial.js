import React, { Component } from 'react'
import Question   from './Question'
import { getAllSounds, refreshSoundScape, checkNumSounds, stopSounds } from './panWads'
import _ from 'lodash'

/*
props to pass in are:
minSounds: starting number of sounds, they will increase up to maxSounds. Default is 3. - int
maxSounds: Number of sounds there will be. This will also be the number of boxes that are there. Note that this can not be larger than the length of the soundScape. This is by default the size of soundScape. - int
soundScape: The soundscape that will be used. Note that maxSounds can not be more than the length of the soundscape. - string
increment: the number to increment the sounds by. Default is 1.
trialLength: the length of the trial in milliseconds. Default is none, so the sounds will continue indefinitely
condition: either: monaural, or pan. - string
soundOptions: a list of strings that the user will see in their select elements. These need to match what is in the soundScape. The default will be sound_list. This will also be the number of select boxes the user has access to.
allowReset: Says if the reset buttons will be visible and if the last itteration will have a button that will say to reset. Note that reset will reset to minSounds. Default is true. - bool
showNextButton: Says if the next button will be visible or not. Default is true. - bool
topComponent: JSX tag that will be above the reset button or the heading for the trials. - jsx.
afterSoundChoicesComponent: JSX after the sound choices.
onPlay: runs when the sounds start to play.
onComplete: handler that will run when the sounds have completed. The state will be passed as an argument.
onNext: handler that will run each time someone presses the continue button. The args that will be passed are: currentSoundObj, stateObject.

The trials list is a list of objects, and the objects look like:
{
	selectedSounds: [list of strings]
	actualSounds: [list of strings]
	startTime: time in ms
	endTime: time in MS
}
*/

export default class SoundTrial extends Component {
	static defaultProps = {
		minSounds: 3,
		maxSounds: Infinity, // will be changed later
		soundScape: "",
		increment: 1,
		trialLength: null,
		soundOptions: null, // set later
		condition: "monaural",
		allowReset: true,
		topComponent: <div />,
		afterSoundChoicesComponent: <div />,
		showNextButton: true,
		onPlay: ()=>{},
		onComplete: ()=>{},
		onNext: ()=>{}
	}

	constructor(props){
		super(props)
		this.state = {
			numberOfSounds: this.props.minSounds,
			played: false,
			trials: [],
			selectedSounds: {},
			startTime: null,
		}
		this.sounds = getAllSounds([this.props.soundScape])
		this.sound_list = this.props.soundOptions || Object.keys(this.sounds)
		this.maxSounds = Math.min(this.props.maxSounds, Object.keys(this.sounds).length)
		
		this.startTrial = this.startTrial.bind(this)
		this.handleNext = this.handleNext.bind(this)
		this.handleSoundChange = this.handleSoundChange.bind(this)
	}

	getAccuracy(correct, answers){
		const correctAnswers = _.differenceWith(correct, answers, _.isEqual)
		const answerAccuracy = correctAnswers.length / correct.llength
		const howManyAccurate = Math.abs(correct.length - answers.length) / correct.length
		const accuracy = howManyAccurate * answerAccuracy
		return accuracy
	}

	handleNext(){
		const currentSounds = getAllSounds(["visitedSounds"])
		const actualSounds = Object.keys(currentSounds).sort()
		const selectedSounds = Object.values(this.state.selectedSounds).sort()
		const accuracy = this.getAccuracy(actualSounds, selectedSounds)
		const endTime = new Date().getTime()
		const startTime = this.state.startTime
		this.setState({trials: [...this.state.trials, {actualSounds, selectedSounds, startTime, endTime, accuracy}], startTime: null})
		stopSounds()
		this.props.onNext(currentSounds, this.state)
		if(this.state.numberOfSounds >= this.maxSounds){
			this.props.onComplete(this.state)
			if(this.props.allowReset){
				this.setState({numberOfSounds: this.props.minSounds, played: false, selectedSounds: {}})
			}
		} else {
			this.setState({numberOfSounds: this.state.numberOfSounds+this.props.increment, played: false, selectedSounds: {}})
		}
			refreshSoundScape(this.props.soundScape)
	}

	startTrial(){
		checkNumSounds(this.state.numberOfSounds, this.props.condition, this.props.soundScape)
		this.props.onPlay()
		this.setState({played: true, startTime: new Date().getTime()})
		if(this.props.trialLength){
			setTimeout(stopSounds, this.props.trialLength)
		}
	}

	handleSoundChange(e, value, p){
		this.setState({selectedSounds: Object.assign({}, this.state.selectedSounds, {[p.label]: value})})
	}

	render(){
		const soundChoices = this.sound_list.map((s, num)=>(
			<Question type="select" label={"sound" + (num+1)} handleChange={this.handleSoundChange} key={num + this.state.numberOfSounds} choices={["---"].concat(this.sound_list)} />
		))

	const lengthText = this.props.trialLength ? `will last around ${_.round(this.props.trialLength/1000)} seconds` : `will last until you hit the next button`

		return(
			<div>
			{this.props.topComponent}
			{this.props.allowReset ? <button onClick={()=>this.setState({numberOfSounds: 3})}>Reset sounds to 3 from {this.state.numberOfSounds}</button> : null}

			<h2>trial {this.state.trials.length+1}</h2>
			<p>Click the below button to start the trial. Note that the trial {lengthText}. Click the Next button when you have selected your answers.</p>
			<button disabled={this.state.played} onClick={this.startTrial}>Start Trial</button>
			<h3>Sounds</h3>
			{soundChoices}
			{this.props.afterSoundChoicesComponent}
			{this.props.showNextButton ? <button disabled={!this.state.played} onClick={this.handleNext}>
				{this.state.numberOfSounds === this.maxSounds && this.props.allowReset ? `Reset to ${this.props.minSounds} sounds` : `Next`}
			</button> : null}
			</div>
		)
	}
}