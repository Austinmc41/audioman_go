import React, {Component} from 'react'

import { getAllSounds } from './panWads'

export default class LearningSounds extends Component {
	constructor(props){
		super(props)
		this.sounds = getAllSounds()
		this.soundNames = Object.keys(this.sounds)
		this.state = {
			currentOption: this.soundNames[0],
			currentSound: this.sounds[this.soundNames[0]],
			playing: false
		}

		this.options = this.soundNames.map(sound=>(
			<option key={sound} value={sound}>{sound}</option>
		))
		this.handleChange = this.handleChange.bind(this)
		this.playSound = this.playSound.bind(this)
	}

	handleChange(e){
		const newOption = e.target.value
		if(this.state.currentSound) this.state.currentSound.stop()
		const newSound = this.sounds[newOption]
		this.setState({currentSound: newSound, currentOption: newOption, playing:true})
		newSound.play().then(()=>this.setState({playing:false}))
	}


	playSound(){
		if(this.state.currentSound) this.state.currentSound.stop()
		this.state.currentSound.play()
			.then(()=>this.setState({playing:false}))
		this.setState({playing:true})
	}

	render(){
		return(
			<div>
			<h1>Learn the Sounds</h1>
			<select onChange={this.handleChange}>
				{this.options}
			</select>
			<button onClick={()=>this.state.currentSound.stop()}>Stop Sound</button>
			<button onClick={this.playSound}>Play Sound</button>
			</div>
		)
	}
}