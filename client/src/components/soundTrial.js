import React, { Component } from 'react'
import Question   from './Question'
import { getAllSounds, refreshSoundScape, checkNumSounds, stopSounds } from './panWads'
import _ from 'lodash'

/*
props to pass in are:
minSounds: starting number of sounds, they will increase up to maxSounds. Default is 3. - int
maxSounds: Number of sounds there will be. This will also be the number of boxes that are there. Note that this can not be larger than the length of the soundScape. This is by default the size of soundScape. - int
soundScape: The soundscape that will be used. Note that maxSounds can not be more than the length of the soundscape. - string
condition: either: monaural, or pan. - string
allowReset: Says if the reset buttons will be visible and if the last itteration will have a button that will say to reset. Note that reset will reset to minSounds. Default is true. - bool
showNextButton: Says if the next button will be visible or not. Default is true. - bool
topComponent: JSX tag that will be above the reset button or the heading for the trials. - jsx.
afterSoundChoicesComponent: JSX after the sound choices.
onPlay: runs when the sounds start to play.
onComplete: handler that will run when the sounds have completed. The state will be passed as an argument.
onNext: handler that will run each time someone presses the continue button. The args that will be passed are: currentSoundObj, stateObject.
*/

export default class SoundTrial extends Component {
	static defaultProps = {
		minSounds: 3,
		maxSounds: null, // will be changed later
		soundScape: "",
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
			selectedSounds: {}
		}
		this.sounds = getAllSounds([this.props.soundScape])
		this.sound_list = Object.keys(this.sounds)
		this.maxSounds = this.props.maxSounds || this.sound_list.length
		
		this.startTrial = this.startTrial.bind(this)
		this.handleNext = this.handleNext.bind(this)
		this.handleSoundChange = this.handleSoundChange.bind(this)
	}

	handleNext(){
		const currentSounds = getAllSounds(["visitedSounds"])
		stopSounds()
		this.props.onNext(currentSounds, this.state)
		if(this.state.numberOfSounds === this.maxSounds){
			this.props.onComplete(this.state)
			if(this.props.allowReset){
				this.setState({numberOfSounds: this.props.minSounds, played: false, selectedSounds: {}})
			}
		} else {
			this.setState({numberOfSounds: this.state.numberOfSounds+1, played: false, selectedSounds: {}})
		}
			refreshSoundScape(this.props.soundScape)
	}

	startTrial(){
		checkNumSounds(this.state.numberOfSounds, this.props.condition, this.props.soundScape)
		this.props.onPlay()
		this.setState({played: true})
	}

	handleSoundChange(e, value, p){
		this.setState({selectedSounds: Object.assign({}, this.state.selectedSounds, {[p.label]: value})})
	}

	render(){
		const soundChoices = this.sound_list.map((s, num)=>(
			<Question type="select" label={"sound" + (num+1)} handleChange={this.handleSoundChange} key={num + this.state.numberOfSounds} choices={["---"].concat(this.sound_list)} />
		))

		return(
			<div>
			{this.props.topComponent}
			{this.props.allowReset ? <button onClick={()=>this.setState({numberOfSounds: 3})}>Reset sounds to 3 from {this.state.numberOfSounds}</button> : null}

			<h2>trial {this.state.numberOfSounds -2}</h2>
			<p>Click the button to start the trial. Note that the trial will last about a minute, and you can't stop or pause the trial once it's started!</p>
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